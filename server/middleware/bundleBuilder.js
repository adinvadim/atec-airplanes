'use strict';
var enb = require('enb');

module.exports = function (req, res, next) {
    var bundles = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    var bundle = bundles[req.path];

    enb.make(['bundles/' + bundle]).then(function() {
        next();
    });
}
