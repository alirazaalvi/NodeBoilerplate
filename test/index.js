const Hapi = require('hapi');
const Lab = require('lab');
const Code = require('code');   // assertion library
const server = require('../index');

var lab = exports.lab = Lab.script();

lab.experiment("Server", function () {
  lab.test("index page", function (done) {
    var options = {
      method: "GET",
      url: "/"
    };

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test("opening the non existent page", function (done) {
    var options = {
      method: "GET",
      url: "/non-existent-page"
    };

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test("api endpoint", function (done) {
    var options = {
      method: "GET",
      url: "/api"
    };

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

});


