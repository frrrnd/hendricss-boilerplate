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
  img: buildRoot + 'assets/images/',
}

/*
	Browser sync reload.
*/

gulp.task('browser-sync', ['html', 'styles', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: buildRoot
    }
  })
});

/*
  pug.
*/

gulp.task('html', function() {
  return gulp.src(src.pug + 'index.pug')
  .pipe(pug({
    pretty: true
    }))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildRoot))
  });

/*

/*
	Compile sass files and minify.
*/

gulp.task('styles', function() {
  return gulp.src(src.css + 'style.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(build.css));
});

/*
	Concat js files and minify.
*/

gulp.task('scripts', function() {
  return gulp.src(src.js + '**/*.js')
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(browserSync.reload({stream:true}))
      .pipe(gulp.dest(build.js));
});

/*
  Image optimization.
 */

gulp.task('images', function(cb) {
    gulp.src([src.img + '**/*.png',src.img + '**/*.jpg',src.img + '**/*.gif',src.img + '**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(build.img)).on('end', cb).on('error', cb);
});

/*
	Watch tasks.
*/

gulp.task('watch', function() {
  gulp.watch(src.css + '**/*.scss', ['styles']);
  gulp.watch(src.js + '**/*.js', ['scripts']);
  gulp.watch(src.pug + '*.pug', ['html']);
  gulp.watch(src.img + '**/*', ['images']);
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