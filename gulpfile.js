/*
 Gulp file. Tasks for build.
*/

'use strict';

var gulp         = require('gulp');
var jade         = require('gulp-jade');
var sass         = require('gulp-sass');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var browserSync  = require('browser-sync');
var gutil        = require('gulp-util');
var sourcemaps   = require('gulp-sourcemaps');


/*
	Browser sync reload.
*/

gulp.task('browser-sync', ['styles', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  })
});

/*
  Jade.
*/

gulp.task('html', function() {
  return gulp.src('source/jade/*.jade')
  .pipe(jade({
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
	Watch tasks.
*/

gulp.task('watch', function() {
  gulp.watch('source/stylesheets/**/*.scss', ['styles']);
  gulp.watch('source/javascripts/**/*.js', ['scripts']);
  gulp.watch('source/jade/*.jade', ['html']);
});


/*
	Run all tasks.
*/

gulp.task('default', ['browser-sync', 'watch']);