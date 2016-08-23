var fs = require("fs");
var express = require('express');
var app = express();

var server = app.listen('9999', 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port)
});

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});