var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serveStatic = require('serve-static'),
    slashes = require('connect-slashes'),
    enb = require('enb'),

    config = require('./config'),
    router = require('./router'),
    path = require('path'),
    staticFolder = config.staticFolder,

    env = process.env.NODE_ENV,
    isDev = env === 'development';

app
    .disable('x-powered-by')
    .set('handle', process.env.PORT || config.express.port)
    .use(express.static(path.join(__dirname, '../static')))
    .use(bodyParser.json({ limit : '50mb' }))
    .use(bodyParser.urlencoded({
        limit : '50mb',
        extended : true,
        parameterLimit : 100000
    }))
    .use(cookieParser())
    .use(slashes())
    .use(router)
    .use(require('./middleware/catchError'));

module.exports = app;
