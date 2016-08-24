var config = require('./config');

module.exports = function(app, env) {
    var server = app.listen(config[env].server.port, config[env].server.domain, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port)
    });

    app.set('views', './' + config[env].server.wayToViews);
    app.set('view engine', config[env].server.viewsFormat);

    return server;
};