var app = require('./server/app'),
    log = require('./server/log');

app
    .listen(app.get('handle'), function() {
        log.info('start worker: ' + process.env.WORKER_ID);
        log.info('NODE_ENV: ' + process.env.NODE_ENV);
        log.info('start PID: ' + process.pid);
        log.verbose('Express server listening on port ' + app.get('handle'));
    });
