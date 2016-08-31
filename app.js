'use strict';
var fs = require('fs');
var config = require('./app/config/config')();
var app = require('./app/config/middleware');

var server = app.listen(config.server.port, config.server.domain, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Env = ' + config.mode);
  console.log('Example app listening at http://%s:%s [%s]', host, port, new Date());
});

app.set('views', config.server.wayToViews);
app.set('view engine', config.server.viewsFormat);
