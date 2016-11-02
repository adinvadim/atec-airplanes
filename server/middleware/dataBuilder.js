'use strict';
const enb = require('enb');
const requireWithoutCache = require('require-without-cache');
const isDev = process.env.NODE_ENV === 'development';
const _require = isDev
    ? (path) => requireWithoutCache(path, require)
    : require;

module.exports = function (req, res, next) {

    // console.log('in dataBuilder : ');
    // console.log(req._parsedOriginalUrl);

    const pages = {
        '/' : 'index',
        '/solo/' : 'solo',
        '/zephir/' : 'zephir',
        '/phaeta/' : 'phaeta',
        '/someplane' : 'someplane',
    }

    const bundles = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    const views = {
        '/' : 'site-index',
        '/solo/' : 'plane-index',
        '/zephir/' : 'plane-index',
        '/phaeta/' : 'plane-index',
        '/someplane/' : 'plane-index',
    };

    const dataCommon = _require('../../db/common.js');
    const data = _require('../../db/' + pages[req.path] + '.js');

    req.data = Object.assign({}, dataCommon, data, {
        bundle : bundles[req.path],
        view : views[req.path]
    });

    next();
}
