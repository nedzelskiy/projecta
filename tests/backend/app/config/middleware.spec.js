//var util = require('util');
describe('Middleware setup', function() {
  var app = require('../../../../app/config/middleware');
  it('should load jsonParser', function(next) {
    // use(bodyParser.json());
    expect((app._router.stack.filter(function(layer) {
      return layer && layer.handle && layer.handle.name === 'jsonParser';
    })).length > 0).toBe(true);
    next();
  });
  it('should load urlencodedParser', function(next) {
    // use.(bodyParser.urlencoded({ extended: true })
    expect((app._router.stack.filter(function(layer) {
      return layer && layer.handle && layer.handle.name === 'urlencodedParser';
    })).length > 0).toBe(true);
    next();
  });
  it('should load router', function(next) {
    // app.use(require('./routes'));
    expect((app._router.stack.filter(function(layer) {
      return layer && layer.handle && layer.handle.name === 'router';
    })).length > 0).toBe(true);
    next();
  });
  it('should load static', function(next) {
    // app.use(express.static(...));
    expect((app._router.stack.filter(function(layer) {
      return layer && layer.handle && layer.handle.name === 'serveStatic';
    })).length === 3).toBe(true);
    next();
  });
});
