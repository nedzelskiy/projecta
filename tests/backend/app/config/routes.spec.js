var util = require('util');
describe('Routes', function() {

  var router = require('../../../../app/config/routes');

  var returnLayer = function(route) {
    return router.stack.filter(function(layer) {
      return layer && layer.route && layer.route.path === route;
    });
  };

  it('route "/" should served by action IndexController.startAppAction', function(next) {
    var handlerBody = returnLayer('/')[0].route.stack[0].handle.toString();
    expect(handlerBody.indexOf('IndexController.startAppAction') > -1).toBe(true);
    next();
  });

});
