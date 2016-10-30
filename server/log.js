var winston = require('winston'),
    log = require('./config.js').log,
    server,
    browser;

/**
 * Transport for nodejs logs
  */
winston.addColors({
  trace : 'magenta',
  input : 'grey',
  verbose : 'cyan',
  prompt : 'grey',
  debug : 'blue',
  info : 'green',
  data : 'grey',
  help : 'cyan',
  warn : 'yellow',
  error : 'red'
});
server = new (winston.Logger)({
    transports : [
        new (winston.transports[log.server.transport])(log.server.view),
        new (winston.transports.File)({ name : 'error-file', filename : 'logs/error.log', level : 'error' }),
        new (winston.transports.File)({ name : 'info-file', filename : 'logs/info.log', level : 'info' })
    ]
});

/**
 * Transport for browser logs
 */
browser = new (winston.Logger)({
    transports : [
        new (winston.transports[log.browser.transport])(log.browser.view)
    ]
});

/**
 * Middleware for logs from browser
 */
server.middle = function(req, res) {
    var msg = req.body;

    msg.meta = msg.meta || null;

    browser[msg.level](msg.message, msg.meta);

    res.status(200).end();
};

module.exports = server;

