'use strict';

var gulp = require('gulp');
// var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var minifyJs = require('gulp-minify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var ignore = require('gulp-ignore');
var nodemon = require('gulp-nodemon');
var del = require('del');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var fs = require('fs');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var paths = {
  html: './www/**/*.html',
  scss: './www/scss/**/*.scss',
  js: 'www/**/*.js',
  lib: ['./www/lib/**/*.js','./www/lib/**/*.css']
};

gulp.task('default', ['serve']);

// Merge and Compress Dependencies into vendor.js and vendor.css
gulp.task('main-bower-files', function() {

  console.log('\nLoading Files...');
  var files = mainBowerFiles({
    paths: {
      bowerDirectory: './www/lib',
      bowerrc: './.bowerrc',
      bowerJson: './bower.json'
    }
  });

  var scripts = [];
  var styles = [];

  for (var i = 0; i < files.length; i++) {
    if ( /[\s\S]+?\.js$/.test(files[i]) ) scripts.push(files[i]) && console.log('Loaded JS File:  ' + files[i]);
    if ( /[\s\S]+?\.css$/.test(files[i]) ) styles.push(files[i]) && console.log('Loaded CSS File: ' + files[i]);
  }

  console.log('\nCombining Files');
  gulp.src(scripts).pipe(concat('vendor.js'))/* .pipe(minifyJs({noSource:true,ext:{src:'-debug.js',min:'.js'}})) */.pipe(gulp.dest('./www/assets/'));
  gulp.src(styles).pipe(concat('vendor.css')).pipe(minifyCss({keepSpecialComments: 0})).pipe(gulp.dest('./www/assets/'));
  console.log('\nSaved Files\n');
});

// Javascript Lint (Validation)
gulp.task('lint', function () {
  return gulp.src(['www/*.js', 'www/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('js', function() {
  return gulp.src(['www/js/app.js', 'www/js/*.js', 'www/js/controllers/*.js'])
  .pipe(concat('appFinal.js'))
  .pipe(ngAnnotate())
  .pipe(gulp.dest('./www/assets'))
  .pipe(minifyJs({ext:{src:'.js',min:'.min.js'}}))
  .pipe(gulp.dest('./www/assets'));
});

// TASK: sass (Compile SCSS Files and Generate Source Maps)
gulp.task('scss-expanded', function (done) {
  gulp.src(paths.scss)
    // Start Sourcmaps
    .pipe(sourcemaps.init({
      debug: false
    }))
    // Sass
    .pipe(sass({
      outputStyle: 'expanded',
      errorLogToConsole: true,
      sourceComments: false
    }).on('error', sass.logError))

    // Write Sourcemaps
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '../scss'
    }))

    // Write Minified Files
    .pipe(gulp.dest('./www/assets'));

    done();
});

gulp.task('scss-minified', function(done) {
  gulp.src(paths.scss)
    // Start Sourcmaps
    .pipe(sourcemaps.init({
      debug: false
    }))
    // Sass
    .pipe(sass({
      outputStyle: 'compressed',
      errorLogToConsole: true,
      sourceComments: false
    }).on('error', sass.logError))
    
    // Minify & Rename CSS File
    .pipe(rename({ extname: '.min.css' }))

    // Write Sourcemaps
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '../assets'
    }))

    // Write Minified Files
    .pipe(gulp.dest('./www/assets'));

    done();
})

// TASK: server (Start Dev Server: nodemon)
gulp.task('server', function(done) {
  nodemon({
    script: __dirname + '/bin/www',
    ext: 'js json html hbs ejs',
    cwd: __dirname,
    ignore: ['www/','.git/'],
    env: { 'NODE_ENV'  : process.env.NODE_ENV ? process.env.NODE_ENV : 'development' }
  });
  done();
});

// TASK: watch (Watch SCSS Files for Changes and run sass task on Modification)
gulp.task('watch:scss', ['scss-expanded','scss-minified'], function () {
  gulp.watch(paths.scss, ['scss-expanded','scss-minified']);
});

gulp.task('watch:js', ['js'], function() {
  gulp.watch('www/js/**/*.js', ['js']);
});

gulp.task('watch:lib', function() {
  gulp.watch(paths.lib, ['main-bower-files'])
})

gulp.task('watch:changes', function() {
  gulp.watch('*', function() {})
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
  });
});

// Main Webserver Task
gulp.task('serve', ['server', 'watch:scss', 'watch:js']);

// Test Web Application
gulp.task('test', ['lint']);