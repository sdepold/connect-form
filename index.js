
/*!
 * Connect - Multipart
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('connect/utils'),
    formidable = require('./support/formidable');

/**
 * Setup multipart with the given `options`.
 *
 * Options:
 *
 *   - `encoding`        Encoding used for incoming forms. Defaults to utf8
 *   - `uploadDir`       Directory to save uploads. Defaults to "/tmp"
 *   - `keepExtensions`  Include original extensions. Defaults to `false`
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

// TODO: urlencoded too

module.exports = function multipart(options){
    options = options || {};
    return function(req, res, next){
        if (multipartRequest(req)) {
            var form = req.form = new formidable.IncomingForm;
            utils.merge(form, options);
            form.onComplete = function(){};
            next();
            form.parse(req, form.onComplete);
        } else {
            next();
        }
    };
};

/**
 * Check if `req` is a multipart request.
 *
 * @param {IncomingMessage} req
 * @return {Boolean}
 * @api private
 */

function multipartRequest(req){
    return (req.method === 'POST'
        || req.method === 'PUT')
        && req.headers['content-type'].indexOf('multipart/form-data') >= 0;
}