export default [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index');
  }
},
  {
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
      reply({result: 'success'});
    }
  }];
