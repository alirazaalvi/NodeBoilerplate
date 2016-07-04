'use strict';
const Hapi = require('hapi');

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
}], (err) => {

  if (err) {
    throw err;
  }

  server.log('info', 'Server running at: ' + server.info.uri);

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index');
    }
  });

  server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
      reply({result: 'success'});
    }
  });

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
