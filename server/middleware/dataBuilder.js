'use strict';
var enb = require('enb');

module.exports = function (req, res, next) {

    // console.log('in dataBuilder : ');
    // console.log(req._parsedOriginalUrl);

    var pages = {
        '/' : 'index',
        '/solo/' : 'solo',
        '/zephir' : 'zephir',
        '/phaeta' : 'phaeta',
        '/someplane' : 'someplane',
    }

    var bundles = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    var views = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    var dataCommon = require('../../db/common.json');
    var data = require('../../db/' + pages[req._parsedOriginalUrl.path] + '.json');

    req.data = {};
    Object.assign(req.data, dataCommon, data, { 
        bundle : bundles[req._parsedOriginalUrl.path],
        view : views[req._parsedOriginalUrl.path]
    });

    // console.log(req.data);

    next();
}
