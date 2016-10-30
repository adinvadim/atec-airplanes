'use strict';

var path = require('path'),
    config = require('./config.js'),
    log = require('./log.js'),
    requireWithoutCache = require('require-without-cache');

function render(req, res, data, context) {
    var useCache = false,
        cacheTTL = config.cacheTTL,
        cache = {},
        bundleTemplates = {};


    var dropCache = function() {
        cache = {};
    }
    var query = req.query,
        user = req.user,
        cacheKey = req.url + (context? JSON.stringify(context): '') + (user? JSON.stringify(user): ''),
        cached = cache[cacheKey],
        html,
        bemjson;

    var bundle = data.bundle;
    var pathToBundle = path.resolve('./bundles', bundle),
        BEMTREE = requireWithoutCache(path.join(pathToBundle, bundle + '.bemtree.js'), require).BEMTREE,
        BEMHTML = requireWithoutCache(path.join(pathToBundle, bundle + '.bemhtml.js'), require).BEMHTML;
    bundleTemplates = {
        BEMTREE : BEMTREE,
        BEMHTML : BEMHTML
    };

    if(useCache && cached && (new Date() - cached.timestamp < cacheTTL)) {
        return res.send(cached.html);
    }

    if (query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');

    var bemtreeCtx = {
        block : 'root',
        context : context,
        data : data
    };

    try {
        bemjson = bundleTemplates.BEMTREE.apply(bemtreeCtx);
    } catch (err) {
        log.error('BEMTREE error', err.stack);
        return res.sendStatus(500);
    }

    if(query.bemjson) return res.send('<pre>' + JSON.stringify(bemjson, null, 4) + '</pre>');

    try {
        html = bundleTemplates.BEMHTML.apply(bemjson);
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
