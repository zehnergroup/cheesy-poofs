var gulp          = require('gulp')
  , gutil         = require('gulp-util')
  , sourcemaps    = require('gulp-sourcemaps')
  , source        = require('vinyl-source-stream')
  , buffer        = require('vinyl-buffer')
  , uglify        = require('gulp-uglify')
  , envify        = require('envify')
  , babelify      = require('babelify')
  , gulpIf        = require('gulp-if')
  , watchify      = require('watchify')
  , bulkify       = require('bulkify')
  , browserify    = require('browserify')
  , getBundleName = require('./bundleName')
  , _             = require('lodash');

module.exports = {
  getBundler: getBundler,
  bundleBuilderFactory: bundleBuilderFactory,
  getBundleName: getBundleName
}

function getBundler(config) {

  var bundler;

  var opts = {
    entries: config.entries,
    debug: true
  }

  if (config.options) opts = _.extend(opts, config);
  if (config.watchify) opts = _.extend(opts, watchify.args)

  bundler = browserify(opts);

  if (config.watchify) bundler = watchify(bundler);

  // add any other browserify options or transforms here
  // bundler.transform(require('partialify'));
  bundler.transform(babelify);
  bundler.transform(bulkify);
  bundler.transform(envify);

  return bundler;

}

function bundleBuilderFactory(bundler) {

  var bundler = bundler;

  return function() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./assets/build/js/'));
  }

}
