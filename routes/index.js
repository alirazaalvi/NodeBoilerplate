import Path from 'path';
import MainController from '../controllers/MainController';

export default [{
  method: '*',
  path: '/{p*}', // catch-all path
  handler: (request, reply) => {
    reply.view('404').code(404);
  },
}, {
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, '..', 'assets/'),
      redirectToSlash: true,
      index: true,
    },
  },
},
{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const mainController = new MainController(request, reply);
    mainController.returnView();
  },
},
{
  method: 'GET',
  path: '/api',
  handler: (request, reply) => {
    const mainController = new MainController(request, reply);
    mainController.returnJson();
  },
}];
