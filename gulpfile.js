/*
 Gulp file. Tasks for build.
*/

'use strict';

var gulp         = require('gulp');
var pug          = require('gulp-pug');
var sass         = require('gulp-sass');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var browserSync  = require('browser-sync');
var gutil        = require('gulp-util');
var sourcemaps   = require('gulp-sourcemaps');
var imageop      = require('gulp-image-optimization');


/*
	Browser sync reload.
*/

gulp.task('browser-sync', ['html', 'styles', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  })
});

/*
  pug.
*/

gulp.task('html', function() {
  return gulp.src('source/pug/index.pug')
  .pipe(pug({
    pretty: true
    }))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('build'))
  });

/*

/*
	Compile sass files and minify.
*/

gulp.task('styles', function() {
  return gulp.src('source/stylesheets/**/*.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('build/assets/stylesheets'));
});

/*
	Concat js files and minify.
*/

gulp.task('scripts', function() {
  return gulp.src('source/javascripts/**/*.js')
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(browserSync.reload({stream:true}))
      .pipe(gulp.dest('build/assets/javascripts'));
});

/*
  Image optimization.
 */

gulp.task('images', function(cb) {
    gulp.src(['source/images/**/*.png','source/images/**/*.jpg','source/images/**/*.gif','source/images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/assets/images')).on('end', cb).on('error', cb);
});

/*
	Watch tasks.
*/

gulp.task('watch', function() {
  gulp.watch('source/stylesheets/**/*.scss', ['styles']);
  gulp.watch('source/javascripts/**/*.js', ['scripts']);
  gulp.watch('source/pug/*.pug', ['html']);
  gulp.watch('source/images/**/*', ['images']);
});


/*
	Run all tasks.
*/

gulp.task('default', ['browser-sync', 'watch']);