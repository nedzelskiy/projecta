var service = require('../../../../app/api/services/ExtendableService');
var dbMockup = {};

describe('ExtendableService service', function() {
  it('should contain createModelInheritance method', function(next) {
    expect(service.createModelInheritance).toBeDefined();
    next();
  });
  it('should contain inheritClassPrototypeProperties method', function(next) {
    expect(service.inheritClassPrototypeProperties).toBeDefined();
    next();
  });
  it('should contain inheritClassProperties method', function(next) {
    expect(service.inheritClassPrototypeProperties).toBeDefined();
    next();
  });
  it('inheritClassProperties method should inherit class properties and only public', function(next) {
    var class1 = function() {};
    class1.publicProp = 'this is a public property!';
    class1._privateProp = 'this is a private property!';

    var class2 = function() {};
    class2.anotherPublicProp = 'this is a public property of obj2';

    service.inheritClassProperties(class1, class2);

    expect(class1.publicProp).toBeDefined();
    expect(class1._privateProp).toBeDefined();
    expect(class1.anotherPublicProp).not.toBeDefined();

    expect(class2._privateProp).not.toBeDefined();
    expect(class2._privateProp).not.toBeDefined();
    expect(class2.anotherPublicProp).toBeDefined();

    next();
  });
  it('inheritClassPrototypeProperties method should inherit prototype class properties, not own properties', function(next) {
    var Class1 = function() {
      this._private = 'this is a private prop of class1';
      this._private1 = 'private 1';
    };
    Class1.prototype.public = 'this is a public prop class1';
    Class1.prototype.public1 = 'public 1';

    var Class2 = function() {
      this._private = 'this is a private prop of class2';
      this._private2 = 'private 2';
    };
    Class2.prototype.public = 'this is a public prop class2';
    Class2.prototype.public2 = 'public 2';

    service.inheritClassPrototypeProperties(Class1, Class2);

    var obj1 = new Class1();
    var obj2 = new Class2();

    expect(obj1._private).toBe('this is a private prop of class1');
    expect(obj1._private1).toBe('private 1');
    expect(obj1._private2).not.toBeDefined();
    expect(obj1.public).toBe('this is a public prop class1');
    expect(obj1.public1).toBe('public 1');
    expect(obj1.public2).not.toBeDefined();

    expect(obj2._private).toBe('this is a private prop of class2');
    expect(obj2._private1).not.toBeDefined();
    expect(obj2._private2).toBe('private 2');
    expect(obj2.public).toBe('this is a public prop class2');
    expect(obj2.public1).toBe('public 1');
    expect(obj2.public2).toBe('public 2');

    next();
  });
  it('options of createModelInheritance method should have constructor prop', function(next) {
    var options = {};
    var parent = function() {};
    parent.prototype.a = 'a';

    expect(service.createModelInheritance(parent, options)).toBe(null);

    options.constructor = {};
    expect(service.createModelInheritance(parent, options)).toBe(null);

    options.constructor = function() {};
    expect(service.createModelInheritance(parent, options)).not.toBe(null);
    expect('function' === typeof service.createModelInheritance(parent, options)).toBe(true);
    next();
  });
  it('createModelInheritance should inherit public props from options', function(next) {
    var options = {};
    options.constructor = function() {};
    options.public = {
      'method': function() {
        return 'method';
      },
      prop: 'b'
    };

    var parent = function() {};
    parent.prototype.a = 'a';

    var Class = service.createModelInheritance(parent, options);
    expect(Class).not.toBe(null);
    expect('function' === typeof Class).toBe(true);

    var obj = new Class();
    expect(obj.prop).toBe('b');
    expect(obj.a).toBe('a');
    expect(obj.method()).toBe('method');

    var Class2 = service.createModelInheritance(Class, options);
    var obj2 = new Class2();
    expect(obj2.prop).toBe('b');
    expect(obj2.a).toBe('a');
    expect(obj2.method()).toBe('method');
    next();
  });
  it('createModelInheritance should inherit prototype class properties, not own properties', function(next) {
    var Class1 = function() {
      this._private = 'this is a private prop of class1';
      this._private1 = 'private 1';
    };
    Class1.prototype.public = 'this is a public prop class1';
    Class1.prototype.public1 = 'public 1';

    var options1 = {
      constructor: function() {
        this._private = 'this is a private prop of class2';
        this._private2 = 'private 2';
      },
      public: {
        public: 'this is a public prop class2',
        public2: 'public 2'
      }
    };

    var Class2 = service.createModelInheritance(Class1, options1);

    var obj1 = new Class1();
    var obj2 = new Class2();

    expect(obj1._private).toBe('this is a private prop of class1');
    expect(obj1._private1).toBe('private 1');
    expect(obj1._private2).not.toBeDefined();
    expect(obj1.public).toBe('this is a public prop class1');
    expect(obj1.public1).toBe('public 1');
    expect(obj1.public2).not.toBeDefined();

    expect(obj2._private).toBe('this is a private prop of class2');
    expect(obj2._private1).not.toBeDefined();
    expect(obj2._private2).toBe('private 2');
    expect(obj2.public).toBe('this is a public prop class2');
    expect(obj2.public1).toBe('public 1');
    expect(obj2.public2).toBe('public 2');

    next();
  });
  it('type of options param in createModelInheritance should be object', function(next) {
    expect(service.createModelInheritance(function() {}, function() {})).toBe(null);
    expect('function' === typeof service.createModelInheritance(function() {}, {
      constructor: function() {}
    })).toBe(true);
    next();
  });
  it('type of parent param in createModelInheritance should be function', function(next) {
    expect(service.createModelInheritance({}, {
      constructor: function() {}
    })).toBe(null);
    expect('function' === typeof service.createModelInheritance(function() {}, {
      constructor: function() {}
    })).toBe(true);
    next();
  });
  it('type of parent param in inheritClassPrototypeProperties should be function', function(next) {
    expect(service.inheritClassPrototypeProperties({}, function() {})).toBe(null);
    expect('function' === typeof service.inheritClassPrototypeProperties(function() {}, function() {})).toBe(true);
    next();
  });
  it('type of Class param in inheritClassPrototypeProperties should be function', function(next) {
    expect(service.inheritClassPrototypeProperties(function() {}, {})).toBe(null);
    expect('function' === typeof service.inheritClassPrototypeProperties(function() {}, function() {})).toBe(true);
    next();
  });
  it('type of Class param in inheritClassProperties should be function', function(next) {
    expect(service.inheritClassProperties(function() {}, {})).toBe(null);
    expect('function' === typeof service.inheritClassProperties(function() {}, function() {})).toBe(true);
    next();
  });
  it('type of parent param in inheritClassProperties should be function', function(next) {
    expect(service.inheritClassProperties({}, function() {})).toBe(null);
    expect('function' === typeof service.inheritClassProperties(function() {}, function() {})).toBe(true);
    next();
  });
  it('createModelInheritance should inherit class properties and only public', function(next) {
    var Class1 = function() {};
    Class1.publicProp = 'this is a public property!';
    Class1._privateProp = 'this is a private property!';

    var options = {
      constructor: function() {},
      public: {
        anotherPublicProp: 'this is another public prop!'
      }
    };
    var Class2 = service.createModelInheritance(Class1, options);

    expect(Class1.publicProp).toBe('this is a public property!');
    expect(Class1._privateProp).toBe('this is a private property!');
    expect(Class1.anotherPublicProp).not.toBeDefined();

    expect(Class2.publicProp).toBe('this is a public property!');
    expect(Class2._privateProp).not.toBeDefined();

    var obj1 = new Class1();
    var obj2 = new Class2();

    expect(obj1.anotherPublicProp).not.toBeDefined();
    expect(obj2.anotherPublicProp).toBe('this is another public prop!');

    next();
  });
});
