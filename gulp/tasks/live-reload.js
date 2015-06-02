var gulp = require('gulp'),
    livereload = require('gulp-livereload');


gulp.task('live-reload', function() {
  livereload.listen({
    port: 35729,
    host: '0.0.0.0'
  });
});