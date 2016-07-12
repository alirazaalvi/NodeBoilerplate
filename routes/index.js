import MainController from '../controllers/MainController';

export default [{
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
      reply({result: 'success'});
    }
  }];
