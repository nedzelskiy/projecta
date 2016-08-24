var bodyParser = require('body-parser');
var app = require('express')();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

app.use(require('./routes'));

module.exports = app;