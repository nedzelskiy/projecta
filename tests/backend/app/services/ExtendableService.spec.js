var service = require('../../../../app/api/services/ExtendableService');
var dbMockup = {};

describe('ExtendableService service', function() {
  it('ExtendableService should contain createInheritance method', function(next) {
    expect(service.createInheritance).toBeDefined();
    next();
  });
  it('should can make object extandable', function(next) {
    var obj = {};
    obj.prototype = Object.prototype;

    obj.prototype.nativePrototypeProperty = 'property';
    obj.prototype.nativePrototypeMethod = function() {
      return 'This is my native prototype method!';
    };

    expect(obj.newProperty).not.toBeDefined();
    expect(obj.newMethod).not.toBeDefined();

    var obj2 = new service.createInheritance(obj, {
      newProperty: 'new property',
      newMethod: function() {
        return 'This is my new property method!';
      }
    });

    expect(obj.nativePrototypeProperty).toBeDefined();
    expect(obj.nativePrototypeProperty).toBe('property');
    expect(obj.nativePrototypeMethod).toBeDefined();
    expect(obj.nativePrototypeMethod()).toBe('This is my native prototype method!');
    expect(obj.newProperty).toBeDefined();
    expect(obj.newProperty).toBe('new property');
    expect(obj.newMethod).toBeDefined();
    expect(obj.newMethod()).toBeDefined('This is my new property method!');

    expect(obj2.nativePrototypeProperty).toBeDefined();
    expect(obj2.nativePrototypeProperty).toBe('property');
    expect(obj2.nativePrototypeMethod).toBeDefined();
    expect(obj2.nativePrototypeMethod()).toBe('This is my native prototype method!');
    expect(obj2.newProperty).toBeDefined();
    expect(obj2.newProperty).toBe('new property');
    expect(obj2.newMethod).toBeDefined();
    expect(obj2.newMethod()).toBeDefined('This is my new property method!');

    next();
  });
});
