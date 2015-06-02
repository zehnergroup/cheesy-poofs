var gulp    = require('gulp')
  , gUtils   = require('gulp-util')
  , bUtils  = require('../utils/browserify');

// Create bundler
var bundler = bUtils.getBundler({
    entries: ['./src/client/app/index.js'],
    watchify: true,
    // Browserify options
    options: {}
  });

// Build our bundle runner from bUtils
var buildBundle = bUtils.bundleBuilderFactory(bundler);

// Create our gulp task
gulp.task('watchify', buildBundle);
// on any dep update, runs the bundler
bundler.on('update', buildBundle);
// echo to log any log messages
bundler.on('log', function(msg){ gUtils.log('Watchify: ' + msg) });
