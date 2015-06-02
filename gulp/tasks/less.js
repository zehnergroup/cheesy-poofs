var gulp        = require('gulp')
  , less        = require('gulp-less')
  , sourcemaps  = require('gulp-sourcemaps')
  , AutoPrefix  = require('less-plugin-autoprefix')
  , livereload  = require('gulp-livereload')
  , autoprefix  = new AutoPrefix({browsers: ['last 2 versions']});

gulp.task('less', function() {

  return gulp.src('src/client/less/index.less')
          // .pipe(sourcemaps.init())
          .pipe(less({
            plugins: [autoprefix]
          }))
          // .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('assets/build/css'))
          .pipe(livereload());
});

gulp.task('watch-less', ['less'], function(){

  return gulp.watch('src/client/less/**/*.less', ['less']);

});
