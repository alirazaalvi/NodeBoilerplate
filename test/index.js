const Hapi = require('hapi');
const Lab = require('lab');
const Code = require('code');   // assertion library
const server = require('../index');

var lab = exports.lab = Lab.script();

lab.experiment("Server", function() {
  lab.test("/", function(done) {
    var options = {
      method: "GET",
      url: "/"
    };

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
});


