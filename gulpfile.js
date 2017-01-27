'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    minifyJs = require('gulp-minify'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    mainBowerFiles = require('main-bower-files'),
    merge = require('merge-stream'),
    paths = {
      html: './www/**/*.html',
      scss: './www/scss/**/*.scss',
      js: 'www/**/*.js'
    };

// Javascript Lint (Validation)
gulp.task('lint', function () {
  return gulp.src(['www/*.js', 'www/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

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
    if ( /[\s\S]+?\.js$/.test(files[i]) ) scripts.push(files[i]) && console.log('Loaded JS File: ' + files[i]);
    if ( /[\s\S]+?\.css$/.test(files[i]) ) styles.push(files[i]) && console.log('Loaded CSS File: ' + files[i]);
  }

  console.log('\nCombining Files');
  gulp.src(scripts).pipe(concat('vendor.js')).pipe(minifyJs({noSource:true,ext:{src:'-debug.js',min:'.js'}})).pipe(gulp.dest('./www/assets/'));
  gulp.src(styles).pipe(concat('vendor.css')).pipe(minifyCss({keepSpecialComments: 0})).pipe(gulp.dest('./www/assets/'));
  console.log('\nSaved Files\n')  
});

// Compile SCSS
gulp.task('scss', function() {

  gulp.src(paths.scss)
  .pipe(sourcemaps.init({
    debug: true
  })).pipe(sass({
    outputStyle: 'expanded',
    errorLogToConsole: true,
    sourceComments: false
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('.', {
    includeContent: false,
    sourceRoot: '../scss'
  }))
  .pipe(gulp.dest('./www/assets'))
  .pipe(livereload());

  gulp.src(paths.scss)
  .pipe(sourcemaps.init({
    debug: true
  })).pipe(sass({
    outputStyle: 'compressed',
    errorLogToConsole: true,
    sourceComments: false
  }).on('error', sass.logError))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(sourcemaps.write('.', {
    includeContent: false,
    sourceRoot: '../scss'
  }))
  .pipe(gulp.dest('./www/assets'))
  .pipe(livereload());
});

// Watch for SCSS File Changes
gulp.task('watch:scss', ['scss'], function() {
  livereload.listen();
  gulp.watch(paths.scss, ['scss']);
});

// Combine and Minify JS files into Single App file
gulp.task('js', function() {
  return gulp.src(['www/js/app.js', 'www/js/**/*.js'])
  .pipe(ngAnnotate())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./www/assets'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./www/assets'))
  .pipe(livereload());
});

// Watch for JS File Changes
gulp.task('watch:js', ['js'], function() {
  livereload.listen();
  gulp.watch(paths.js, ['js']);
});

// Start Local Web Server (nodemon)
gulp.task('server', ['watch:js', 'watch:scss'], function() {
  nodemon({
    script: 'bin/www',
    ext: 'js html hbs css scss',
    cwd: __dirname,
    ignore: ['www/'],
    env: {
      'ENV'  : process.env.ENV ? process.env.ENV : 'development',
      'NODE_ENV'  : process.env.ENV ? process.env.ENV : 'development'
    }
  });
});

// Reload HTML Files
gulp.task('connect-html', function() {
  gulp.src(paths.html)
  .pipe(connect.reload());
});

// Reload HTML Files
gulp.task('connect-js', function() {
  gulp.src(paths.js)
  .pipe(connect.reload());
});

// Watch For Changes to HTML & JS Files and Refresh on Modification
gulp.task('connect-server', ['connect', 'watch-changes'], function() {
  gulp.watch(paths.html, ['connect-html']);
  gulp.watch(paths.js, ['connect-js'])
});

gulp.task('watch-changes', function() {
  gulp.watch('*', function() {})
  .on('change', function(event) {
    console.log('Change Detected: File ' + event.path + ' was ' + event.type);
  });
});

gulp.task('default', ['server', 'watch-changes']);

// Test Web Application
gulp.task('test', ['lint']);
