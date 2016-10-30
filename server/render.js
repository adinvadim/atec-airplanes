'use strict';

var path = require('path'),
    config = require('./config.js'),
    log = require('./log.js'),

    env = process.env.NODE_ENV,
    isDev = env === 'development',
    useCache = !isDev,
    cacheTTL = config.cacheTTL,
    cache = {},
// Готовим бандлы
    bundles = ['index'];

var bundlesTemplates = {};

bundles.forEach(function(bundle) {
    var pathToBundle = path.resolve('./bundles', bundle),
        BEMTREE = require(path.join(pathToBundle, bundle + '.bemtree.js')).BEMTREE,
        BEMHTML = require(path.join(pathToBundle, bundle + '.bemhtml.js')).BEMHTML;

    bundlesTemplates[bundle] = {
        BEMTREE : BEMTREE,
        BEMHTML : BEMHTML
    };
});


function dropCache() {
    cache = {};
}

function render(req, res, data, context) {
    var query = req.query,
        user = req.user,
        cacheKey = req.url + (context? JSON.stringify(context): '') + (user? JSON.stringify(user): ''),
        cached = cache[cacheKey],
        html,
        bemjson;

    if(useCache && cached && (new Date() - cached.timestamp < cacheTTL)) {
        return res.send(cached.html);
    }

    if(isDev && query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');

    var bemtreeCtx = {
        block : 'root',
        context : context,
        mods : {
            view : data.bundle
        },
        // extend with data needed for all routes
        data : data
    };

    try {
        bemjson = bundlesTemplates[data.bundle].BEMTREE.apply(bemtreeCtx);
    } catch (err) {
        log.error('BEMTREE error', err.stack);
        return res.sendStatus(500);
    }

    if(isDev && query.bemjson) return res.send('<pre>' + JSON.stringify(bemjson, null, 4) + '</pre>');

    try {
        html = bundlesTemplates[data.bundle].BEMHTML.apply(bemjson);
    } catch (err) {
        log.error('BEMHTML error', err.stack);
        return res.sendStatus(500);
    }

    useCache && (cache[cacheKey] = {
        timestamp : new Date(),
        html : html
    });

    res.send(html);
}

module.exports = render;
