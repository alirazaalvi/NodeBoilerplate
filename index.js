import Hapi from 'hapi';
import routesIndex  from './routes/index';

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
    html: require('handlebars')
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
