
/**
 * Module dependencies.
 */

var connect = require('connect'),
    multipart = require('./../index');

// Test server

var server = connect.createServer(
    multipart(),
    function(req, res, next){
        next();
    }
);

// Tests

exports['test single field'] = function(assert){
    var headers = {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryMfJEpQcCbybb6A8U'
    };

    var body = [
        '------WebKitFormBoundaryMfJEpQcCbybb6A8U',
        'Content-Disposition: form-data; name="name"',
        '',
        'foo',
        '------WebKitFormBoundaryMfJEpQcCbybb6A8U--\r\n'
    ].join('\r\n');

    assert.response(server,
        { url: '/' },
        { body: 'Cannot find /' });
    
    assert.response(server,
        { url: '/', method: 'POST', headers: headers, data: body },
        { body: '' });
};