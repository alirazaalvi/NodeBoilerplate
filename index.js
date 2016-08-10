import Hapi from 'hapi';
import routesIndex  from './routes/index';
import Handlebars from 'handlebars';
import extend from './views/helpers/handlebars-extend-blocks';
import {getDb} from './helpers';

//just to test mongodb database is connected through mongoose odm.
//you can safely remove it if you don't want mongodb or mongoose
const db = getDb();
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Db is connected');
});
/////////////////////////////////////////////////////////



// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

const goodConsoleOptions = {
  reporters: {
    console: [{
      module: 'good-console'
    }, 'stdout']
  }
};

server.register([{
  register: require('vision'),
  options: {}
}, {
  register: require('good'),
  options: goodConsoleOptions
}, {
  register: require('inert'),
  options: {}
}], (err) => {

  if (err) {
    throw err;
  }

  server.log('info', 'Server running at: ' + server.info.uri);

  server.route(routesIndex);
});

//setting the templating engine
server.views({
  engines: {
    html: extend(Handlebars)
  },
  relativeTo: __dirname,
  path: './views',
  layout: true,
  layoutPath: './views/layout',
  helpersPath: './views/helpers'
});

// Start the server
if (!module.parent) {
  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
