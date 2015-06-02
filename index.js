// Enables ES6 syntax
// NOTE: This entrypoint, and only this entrypoint, cannot use ES6 syntax
require('babel/register');

var Glue = require('glue');
var Manifest = require('./src/server/manifest');

var composeOptions = {
    relativeTo: __dirname
};

var Composer = module.exports = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);

if (!module.parent) {
  Composer(function(err, server) {
    if (err) throw err;
    server.start(function () {
      server.log(['server', 'info'], 'Server started at ' + server.info.uri);
    });
  })
}
