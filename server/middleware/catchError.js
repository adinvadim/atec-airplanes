'use strict';
var log = require('../log');

module.exports = function (err, req, res, next) {
    if (err != null) {
        if (req.xhr) {
            res.json(err)
        } else {
            log.error(err.stack)
            res.send(err)
        }
    }
    next();
}
