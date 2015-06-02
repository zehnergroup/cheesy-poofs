var Lab         = require("lab")
  , Code        = require('code')
  , Composer    = require('../../../index')
  , expect      = Code.expect
  , lab         = exports.lab = Lab.script();

lab.experiment("API: Services", function() {

  var server;

  lab.before(function(done) {
    Composer(function(err, composedServer) {
      server = composedServer;
      done(err);
    })
  });

  lab.test("/api/services/{category} should return an object", function(done) {
    var options = {
      method: "GET",
      url: "/api/services/technology"
    };

    server.inject(options, function(response) {

      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.object();

      done();
    });
  });

});
