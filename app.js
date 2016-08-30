'use strict';
var fs = require('fs');
var config = require('./app/config/config')();
var app = require('./app/config/middleware');
var server = require('./app/config/configure')(app, config);
