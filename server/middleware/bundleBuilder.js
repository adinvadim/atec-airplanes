'use strict';
const enb = require('enb');
const gulp = require('gulp');
require('../../gulpfile.js');

module.exports = function (req, res, next) {
    var bundles = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    var bundle = bundles[req.path];

    enb.make(['bundles/' + bundle])
        .then(() => {
            //console.log(gulp.tasks)
            if (gulp.tasks.copy) {
                return gulp.start('copy')
            }
            return
        })
        .then(() => next());
}
