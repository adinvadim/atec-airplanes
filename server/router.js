var express = require('express'),
    path = require('path'),
    router = express.Router(),
    log = require('./log.js'),
    config = require('./config.js'),
    enb = require('enb'),
    env = process.env.NODE_ENV,
    isDev = env === 'development';

var bundleBuilder = require('./middleware/bundleBuilder.js');

var dataBuilder = require('./middleware/dataBuilder.js');

var render = isDev ? require('./render-dev.js') : require('./render.js');

// router.use(function (req, res, next) {
//     console.log('in router use : ')
//     console.log(req.url);
//     console.log(req.originalUrl);
//     // console.log(req._parsedOriginalUrl);
//     next();
// });

router.get('/', 
    bundleBuilder,
    dataBuilder,
    function(req, res) {
        var data = req.data;
        render(req, res, data);
    }
);

router.get('/:plane',
    bundleBuilder,
    dataBuilder,
    function(req, res) {
        var data = req.data;
        render(req, res, data);
    }
);

module.exports = router;
