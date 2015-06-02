var Lab         = require("lab")
  , Code        = require('code')
  , Composer    = require('../../index')
  , expect      = Code.expect
  , lab         = exports.lab = Lab.script();

lab.experiment("Hello", function() {

  var server;

  lab.before(function(done) {
    Composer(function(err, composedServer) {
      server = composedServer;
      done(err);
    })
  });

  lab.test("should return 'hello world'", function(done) {
    var options = {
      method: "GET",
      url: "/hello"
    };

    server.inject(options, function(response) {

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.include('hello world');

      done();
    });
  });
});
