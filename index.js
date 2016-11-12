import Hapi from 'hapi';
import Handlebars from 'handlebars';
import Vision from 'vision';
import Good from 'good';
import Inert from 'inert';
import routesIndex from './routes/index';
import extend from './views/helpers/handlebars-extend-blocks';

// Uncomment this line to import mongodb connection helper if you are using mongodb.
// import {getDb} from './helpers';

// If you want to connect to mongodb using mongoose then
// simply uncomment the commented 'Mongodb Connection' block
// Update the connection string in index.js file inside config folder.
// /////////////////////////Mongodb Connection////////////////////////
/* const db = getDb();
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Db is connected');
});*/
// /////////////////////////Mongodb Connection////////////////////////



// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000,
});

const goodConsoleOptions = {
  reporters: {
    console: [{
      module: 'good-console',
    }, 'stdout'],
  },
};

server.register([{
  register: Vision,
  options: {},
}, {
  register: Good,
  options: goodConsoleOptions,
}, {
  register: Inert,
  options: {},
}], (err) => {
  if (err) {
    throw err;
  }

  server.log('info', `Server running at: ${server.info.uri}`);

  server.route(routesIndex);
});

// setting the templating engine
server.views({
  engines: {
    html: extend(Handlebars),
  },
  relativeTo: __dirname,
  path: './views',
  layout: true,
  layoutPath: './views/layout',
  helpersPath: './views/helpers',
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
