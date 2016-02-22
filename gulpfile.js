var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: 8000,
    livereload: true
  });
});

gulp.task('build', function () {
  return browserify('./src/jsx/app.jsx')
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/js/'))
    .pipe(connect.reload());
});

gulp.task('watch', ['build'], function () { 
  gulp.watch('src/jsx/*.jsx', ['build']);
});

gulp.task('default', ['watch', 'connect']);
