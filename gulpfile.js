'use strict';

const gulp = require('gulp'),
    shell = require('gulp-shell'),
    gulpsync = require('gulp-sync')(gulp),
    gls = require('gulp-live-server'),
    enb = require('enb'),
    changed = require('gulp-changed'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserfy = require('gulp-browserify');

var config = require('./server/config.js');

let server = gls('./server.js', { env : process.env }, config.gls.port );

gulp.task('server:stop', () => {
    server.stop.apply(server)
})

gulp.task('server:start', () => {
    server.start.apply(server)
})

gulp.task('enb', shell.task([
    'enb make'
]))

gulp.task('cleanBundles', shell.task([
    'rm -rf .enb/tmp && ./node_modules/.bin/enb make clean'
]))

gulp.task('clean', ['cleanBundles'], () => {
    del.sync(['./static/themes/new/**', '../../web/themes/new/**', './.enb/tmp/**'], { force : true });
    return shell.task(['./node_modules/.bin/enb make clean']);
})

gulp.task('images', () => {
    gulp.src('./blocks/**/*.{png,jpg,svg}')
        .pipe(gulp.dest('../../web/themes/new/_static/'))
        .pipe(gulp.dest('./static/themes/new/_static'))
})


gulp.task('fonts', () => {
    gulp.src('./blocks/fonts/**/*.ttf')
        .pipe(gulp.dest('../../web/themes/new/_static/fonts'))
        .pipe(gulp.dest('./static/themes/new/_static/fonts'))
})


gulp.task('iconssprite', () => {
    gulp.src('./blocks/**/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg : true
        }))
        .pipe(cheerio({
            run : function($) {
                $('symbol').attr({
                    fill : 'currentColor',
                    //viewBox : '0 0 100 100'
                })
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename(function(path) {
            path.basename = 'svg';
            path.extname = '.svg'
        }))
        .pipe(gulp.dest('../../web/themes/new/_static/'))
        .pipe(gulp.dest('./static/themes/new/_static'))
})


gulp.task('copy', () => {
    gulp.src('./bundles/**/*')
        .pipe(changed('./static/themes/new'))
        .pipe(gulp.dest('./static/themes/new'));
});

gulp.task('vendor', () => {
    gulp.src('./blocks/**/*.source.js')
        .pipe(browserfy({
            paths: ['./node_modules', './libs/']
        }))
        .pipe(rename(function(path) {
            path.extname = '.browser.js'
        }))
        .pipe(gulp.dest('blocks/'));
})

gulp.task('watch', function() {
    server.start().then(function(result) {
        console.log(`Server exited with result ${result}`)
    })
    gulp.watch('./bundles/**/*', ['copy']);
    gulp.watch('./server/**/*.js', ['server:start']);
    gulp.watch('./blocks/**/*.svg', ['iconssprite']);
    gulp.watch('./blocks/**/*.source.js', ['vendor'])
})

gulp.task('static', gulpsync.sync(['images', 'fonts', 'iconssprite', 'vendor']))

gulp.task('default', gulpsync.sync(['clean', 'static', 'enb', 'copy', 'server:start', 'watch']))
