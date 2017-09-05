/*
 Gulp file. Tasks for build.
*/

'use strict';

var gulp         = require('gulp'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    clean        = require('gulp-clean'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-minify-css'),
    browserSync  = require('browser-sync'),
    gutil        = require('gulp-util'),
    sourcemaps   = require('gulp-sourcemaps'),
    imageop      = require('gulp-image-optimization');

/*
  Set paths.
*/

var srcRoot = './source/',
    buildRoot = './build/';

var src = {
  img: srcRoot + 'images/',
  js: srcRoot + 'javascripts/',
  pug: srcRoot + 'pug/',
  css: srcRoot + 'stylesheets/',
};

var build = {
  js: buildRoot + 'assets/javascripts/',
  css: buildRoot + 'assets/stylesheets/',
}

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
  Clean build.
*/

gulp.task('clean', function() {
  return gulp.src('build')
    .pipe(clean());
});


/*
	Run all tasks.
*/

gulp.task('default', ['browser-sync', 'watch']);