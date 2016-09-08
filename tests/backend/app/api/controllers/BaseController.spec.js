var BaseController = require('../../../../../app/api/controllers/BaseController');
describe('Base controller', function() {
  it('should have a method extend which returns a child instance', function(next) {
    expect(BaseController.extend).toBeDefined();
    var child = BaseController.extend({
      name: 'my child controller'
    });
    expect(child.run).toBeDefined();
    expect(child.name).toBe('my child controller');
    expect(child.extend).toBeDefined();
    next();
  });
  it('should be able to create different childs', function(next) {
    var childA = BaseController.extend({
      name: 'child A',
      customProperty: 'value'
    });
    var childB = BaseController.extend({
      name: 'child B'
    });
    expect(childB.name).toBe('child B');
    expect(childA.name).not.toBe(childB.name);
    expect(childB.customProperty).not.toBeDefined();
    next();
  });
});
