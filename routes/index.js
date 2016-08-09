import MainController from '../controllers/MainController';
import Path from 'path';

export default [{
  method: '*',
  path: '/{p*}', // catch-all path
  handler: function (request, reply) {
    reply.view('404').code(404);
  }
}, {
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, '..', 'assets/'),
      redirectToSlash: true,
      index: true
    }
  }
},
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      let mainController = new MainController(request, reply);
      mainController.returnView();
    }
  },
  {
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
      let mainController = new MainController(request, reply);
      mainController.returnJson();
    }
  }];
