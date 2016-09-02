//http://habrahabr.ru/post/250569/
'use strict';

var gulp = require('gulp');
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var prefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var rimraf = require('gulp-rimraf');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();
var htmlclean = require('gulp-htmlclean');
var replace = require('gulp-replace');
var search = require('gulp-search');
var shell = require('gulp-shell');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var configServer = require('./app/config/config.js')('dev');

var config = {
  build: { // to
    js: 'app/public/js/',
    styles: 'app/public/css/',
    img: 'app/public/img/',
    fonts: 'app/public/fonts/'
  },
  src: { // from
    ts: 'app/assets/ts/**/*.ts',
    styles: [
      'app/assets/scss/**/*.scss'
    ],
    img: 'app/assets/img/**/*.*',
    fonts: 'app/assets/fonts/**/*.*',
    backend: [
      'app/api/**/*.*',
      'app/config/**/*.*'
    ],
    backendTests: 'tests/backend/**/*.*'
  },
  watch: { // for what file need watch
    ts: 'app/assets/ts/**/*.ts',
    styles: 'app/assets/scss/**/*.scss',
    img: 'app/assets/img/**/*.*',
    views: 'app/assets/views/**/*.ejs',
    fonts: 'app/assets/fonts/**/*.*',
    gulpfile: 'gulpfile.js',
    nodemon: [
      'app/public',
      'app/api',
      'app/config',
      'app/assets/views',
      'app/assets/img',
      'app/assets/fonts',
      'app.js'
    ]
  },
  clean: [
    'app/public/js/*',
    'app/public/css/*',
    'app/public/img/*',
    'app/public/templates/*',
    'app/public/fonts/*'
  ],
  prefixopt: {
    browsers: ['> 1%'],
    cascade: false
  }
};

gulp.task('clean', function() {
  config.clean.forEach(function(v) {
    gulp.src(v, {
        read: false
      })
      .pipe(rimraf());
  });
  console.log('Clean task was done!');
});

gulp.task('js:build', function() {
  var result = gulp.src(config.src.ts)
    .pipe(changed(config.build.js))
    .pipe(ts({
      //out: 'js.js',
      'target': 'es6',
      'module': 'commonjs',
      'moduleResolution': 'node',
      'sourceMap': true,
      'emitDecoratorMetadata': true,
      'experimentalDecorators': true,
      'removeComments': false,
      'noImplicitAny': true,
      'suppressImplicitAnyIndexErrors': true
    }))
    //.pipe(concat('js.js'))
    //.pipe(uglify()) // compress js
    .pipe(gulp.dest(config.build.js));
});

gulp.task('styles:build', function() {
  var result = gulp.src(config.src.styles)
    .pipe(changed(config.build.styles))
    .pipe(concat('css.css'))
    .pipe(sass()) // compile
    .pipe(prefixer(config.prefixopt)) // add vendor prefixes
    .pipe(cssmin()) // compress css
    .pipe(gulp.dest(config.build.styles));
  console.log('Styles task was done!');
});

gulp.task('img:build', function() {
  var result = gulp.src(config.src.img)
    .pipe(changed(config.build.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(config.build.img));
  console.log('Img task was done!');
});

gulp.task('fonts:build', function() {
  var result = gulp.src(config.src.fonts)
    .pipe(changed(config.build.fonts))
    .pipe(gulp.dest(config.build.fonts));
  console.log('Fonts task was done!');
});

gulp.task('build', [
  'js:build',
  'styles:build',
  'fonts:build',
  'img:build'
], function() {
  console.log('Project was built!');
});

gulp.task('watch', function() {
  watch([config.watch.styles], function(event, cb) {
    console.log('.scss has been changed!');
    gulp.start('styles:build');
  });
  watch([config.watch.ts], function(event, cb) {
    console.log('.ts has been changed!');
    gulp.start('js:build');
  });
  watch([config.watch.img], function(event, cb) {
    console.log('Images has been changed!');
    gulp.start('img:build');
  });
  watch([config.watch.fonts], function(event, cb) {
    console.log('Fonts has been changed!');
    gulp.start('fonts:build');
  });
  watch([config.watch.views], function(event, cb) {
    console.log('Views has been changed!');
    gulp.start('build');
  });
  watch([config.watch.gulpfile], function(event, cb) {
    console.log('Gulpfile have been changed!');
    gulp.start('build');
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:' + configServer.server.port,
    port: 4000
  });
});

gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script: 'app.js',
    watch: config.watch.nodemon
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function() {
    setTimeout(function() {
      browserSync.reload();
    }, 1000);
  });
});

gulp.task('start-backend-test', shell.task([
  'jasmine-node ./tests/backend',
  'echo "CALLED ON [' + new Date() + ']"'
]));

gulp.task('watch-backend', function() {
  var backendFiles = config.src.backend;
  backendFiles.push(config.src.backendTests);
  watch(backendFiles, function(event, cb) {
    console.log('backend files has been changed!');
    gulp.start('start-backend-test');
  });
});

// THIS IS API GULP'S TASKS

// start backend tests
// should start in new console
gulp.task('bt', function() {
  console.log('Starting auto backend testing...');
  gulp.start('watch-backend');
  gulp.start('start-backend-test');
});

// start server with livereaload
gulp.task('l', ['browser-sync'], function() {
  console.log('Server was running with l - livereload!');
  gulp.start('build');
  gulp.start('watch');
});

// start server without livereload
gulp.task('default', ['nodemon'], function() {
  console.log('Server running!');
  gulp.start('build');
  gulp.start('watch');
});
