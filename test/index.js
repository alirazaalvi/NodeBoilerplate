const Lab = require('lab');
const Code = require('code');   // assertion library
const server = require('../index');

const lab = exports.lab = Lab.script();

lab.experiment('Server', () => {
  lab.test('index page', (done) => {
    const options = {
      method: 'GET',
      url: '/',
    };

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test('opening the non existent page', (done) => {
    const options = {
      method: 'GET',
      url: '/non-existent-page',
    };

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test('api endpoint', (done) => {
    const options = {
      method: 'GET',
      url: '/api',
    };

    server.inject(options, (response) => {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
