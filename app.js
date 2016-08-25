var env = 'dev';

var fs = require('fs');
var app = require('./app/config/middleware');
var server = require('./app/config/configure')(app, env);
