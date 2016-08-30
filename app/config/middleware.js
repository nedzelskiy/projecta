'use strct';
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
app.use(express.static(path.join(__dirname, '../../bower_components')));
app.use(require('./routes'));

module.exports = app;
