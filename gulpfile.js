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
var configServer = require('./app/config/config.js');

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
    fonts: 'app/assets/fonts/**/*.*'
  },
  watch: {
    ts: 'app/assets/ts/**/*.ts',
    styles: 'app/assets/scss/**/*.scss',
    img: 'app/assets/img/**/*.*',
    views: 'app/assets/views/**/*.ejs',
    fonts: 'app/assets/fonts/**/*.*',
    gulpfile: 'gulpfile.js'
  },
  clean: [
    'app/public/js/*',
    'app/public/css/*',
    'app/public/img/*',
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
      target: 'es6',
      module: 'commonjs',
      moduleResolution: 'node',
      sourceMap: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      removeComments: false,
      noImplicitAny: true,
      suppressImplicitAnyIndexErrors: true
    }))
    //.pipe(concat('js.js'))
    //.pipe(uglify()) // compress js
    .pipe(gulp.dest(config.build.js));

  gulp.src('systemjs.config.js')
    .pipe(changed('app/public/js/'))
    .pipe(gulp.dest('app/public/js/'));
  console.log('Js task was done!');
  return onLiveReload(result);

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
  return onLiveReload(result);
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
  return onLiveReload(result);
});

gulp.task('fonts:build', function() {
  var result = gulp.src(config.src.fonts)
    .pipe(changed(config.build.fonts))
    .pipe(gulp.dest(config.build.fonts));
  console.log('Fonts task was done!');
  return onLiveReload(result);
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

gulp.task('default', ['nodemon'], function() {
  console.log('Server running!');
  gulp.start('build');
  gulp.start('watch');
});
gulp.task('l', ['browser-sync'], function() {
  console.log('Server was running with l - livereload!');
  gulp.start('build');
  gulp.start('watch');
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:' + configServer.dev.server.port,
    port: 4000
  });
});

gulp.task('nodemon', ['start-backend-test'], function(cb) {
  var started = false;
  return nodemon({
    script: 'app.js',
    ext: 'js html ejs ts jpg png json'
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function() {
    gulp.start('start-backend-test');
    setTimeout(function() {
      browserSync.reload();
    }, 2000);
  });
});

gulp.task('start-backend-test', shell.task([
  'jasmine-node ./tests/backend'
]));
