'use strict';

const Hapi = require('hapi');
const Good = require('good');


// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});


server.register(
  [
    require('inert'),
    {
      register: Good,
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: {
            response: '*',
            log: '*'
          }
        }]
      }
    },
    require('vision')
  ], (err) => {
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
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
