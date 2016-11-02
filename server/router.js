const express = require('express'),
    path = require('path'),
    router = express.Router(),
    log = require('./log.js'),
    config = require('./config.js'),
    enb = require('enb'),
    env = process.env.NODE_ENV,
    isDev = env === 'development';

const bundleBuilder = require('./middleware/bundleBuilder.js');

const dataBuilder = require('./middleware/dataBuilder.js');

const render = isDev ? require('./render-dev.js') : require('./render.js');

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
        const data = req.data;
        render(req, res, data);
    }
);

router.get('/:plane',
    bundleBuilder,
    dataBuilder,
    function(req, res) {
        const data = req.data;
        render(req, res, data);
    }
);

module.exports = router;
