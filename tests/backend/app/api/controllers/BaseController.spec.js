var BaseController = require('../../../../../app/api/controllers/BaseController');
describe('Base controller', function() {
  it('should have a method extend which returns a child instance', function(next) {
    expect(BaseController.inherit).toBeDefined();
    var child = BaseController.inherit({
      name: 'my child controller'
    });
    expect(child.name).toBe('my child controller');
    expect(child.inherit).toBeDefined();
    next();
  });
  it('should has name BaseController', function(next) {
    expect(BaseController.name).toBe('BaseController');
    next();
  });
  it('should be able to create different childs', function(next) {
    var childA = BaseController.inherit({
      name: 'child A',
      customProperty: 'value'
    });
    var childB = BaseController.inherit({
      name: 'child B'
    });
    expect(childB.name).toBe('child B');
    expect(childA.name).not.toBe(childB.name);
    expect(childB.customProperty).not.toBeDefined();
    next();
  });
});
