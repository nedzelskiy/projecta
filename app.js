'use strict';
var fs = require('fs');
var config = require('./app/config/config')();
var app = require('./app/config/middleware');

var server = app.listen(config.server.port);
console.log('Env = ' + config.mode);
console.log('Example app listening on port %s [%s]', server.address().port, new Date());

app.set('views', config.server.wayToViews);
app.set('view engine', config.server.viewsFormat);
