//http://habrahabr.ru/post/250569/
'use strict';

var gulp = require('gulp');
var fs = require("fs");
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
var browserSync = require('browser-sync');
var htmlclean = require('gulp-htmlclean');
var replace = require('gulp-replace');
var search = require('gulp-search');
var shell = require('gulp-shell');
var ts = require('gulp-typescript');



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
        fonts: 'app/assets/fonts/**/*.*'
    },
    clean: [
        'app/public/js/*',
        'app/public/css/*',
        'app/public/img/*',
        'app/public/fonts/*'
    ],
    livereload: {
        isActive: false,
        proxy: __dirname.split('/').pop(), // project's folder name
        open: true,
        notify: false
    },
    prefixopt: {
        browsers: ['> 1%'],
        cascade: false
    }
};


if (config.livereload.isActive) {
    browserSync({
        proxy: config.livereload.proxy,
        open: config.livereload.open,
        notify: config.livereload.notify
    });
}

function onLiveReload(gulp) {
    if (config.livereload.isActive) {
        return gulp.pipe(browserSync.reload({stream: true}));
    }
    return gulp;
}
;

gulp.task('clean', function () {
    config.clean.forEach(function (v) {
        gulp.src(v, {read: false})
                .pipe(rimraf());
    });
});


gulp.task('js:build', function () {
    var result = gulp.src(config.src.ts)
            .pipe(changed(config.build.js))
            .pipe(ts({
                noImplictitAny: true,
                out: 'js.js'
            }))
            .pipe(concat('js.js'))
            .pipe(uglify()) // compress js
            .pipe(gulp.dest(config.build.js));
    return onLiveReload(result);

});

gulp.task('styles:build', function () {
    var result = gulp.src(config.src.styles)
            .pipe(changed(config.build.styles))
            .pipe(concat('css.css'))
            .pipe(sass()) // compile
            .pipe(prefixer(config.prefixopt)) // add vendor prefixes
            .pipe(cssmin()) // compress css
            .pipe(gulp.dest(config.build.styles));
    return onLiveReload(result);
});

gulp.task('img:build', function () {
    var result = gulp.src(config.src.img)
            .pipe(changed(config.build.img))
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(config.build.img));
    return onLiveReload(result);
});


gulp.task('fonts:build', function () {
    var result = gulp.src(config.src.fonts)
            .pipe(changed(config.build.fonts))
            .pipe(gulp.dest(config.build.fonts));
    return onLiveReload(result);
});

gulp.task('start', shell.task([
    "echo Building project was finished!",
    'nodemon app.js -e js,ejs,ts'
]));

gulp.task('build', [
    'js:build',
    'styles:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function () {
    watch([config.watch.styles], function (event, cb) {
        gulp.start('styles:build');
    });
    watch([config.watch.ts], function (event, cb) {
        gulp.start('js:build');
    });
    watch([config.watch.img], function (event, cb) {
        gulp.start('img:build');
    });
    watch([config.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    watch([config.watch.views], function (event, cb) {
        gulp.start('build');
    });
});

gulp.task('default', ['build', 'watch', 'start']);