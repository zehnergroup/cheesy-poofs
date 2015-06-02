var Lab         = require("lab")
  , Code        = require('code')
  , Composer    = require('../../../index')
  , expect      = Code.expect
  , lab         = exports.lab = Lab.script();

lab.experiment("API: Work", function() {

  var server;

  lab.before(function(done) {
    Composer(function(err, composedServer) {
      server = composedServer;
      done(err);
    })
  });

  lab.test("/api/work should return an object", function(done) {
    var options = {
      method: "GET",
      url: "/api/work"
    };

    server.inject(options, function(response) {

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.object();

      done();
    });
  });

  lab.test("/api/work/{slug} should return an object", function(done) {
    var options = {
      method: "GET",
      url: "/api/work/pledgeling"
    };

    server.inject(options, function(response) {

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.object();

      done();
    });
  });

});
