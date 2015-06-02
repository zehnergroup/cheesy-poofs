var gulp   = require('gulp')
  , bUtils = require('../utils/browserify');

gulp.task('browserify', function() {

  var bundler = bUtils.getBundler({
    entries: ['./src/client/app/index.js'],
    watchify: false,
    // Browserify options
    options: {}
  });

  var buildBundle = bUtils.bundleBuilderFactory(bundler);

  return buildBundle();

});
