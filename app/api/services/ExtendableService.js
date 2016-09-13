'use strict';
module.exports = {
  /**
   * Extend exsist class of model for new properties
   * and return new extended class of model
   *
   * Example for use:
   * var ObjB = createInheritance(ObjA ,{
   *  constructor: function ObjB() {
   *    alert('constructor b');
   *    this._b = 'own b';
   *  },
   *  public: {
   *    'publicb': 'public b'
   *  }
   * });
   * @param {function} parent parent class constructor, which is for inheritance
   * @param {obj} options options for build new class constructor
   * @return {function|null} Class constructor or null if error
   */
  createModelInheritance: function(parent, options) {
    if ('function' !== typeof parent) {
      return null;
    }
    if ('object' !== typeof options) {
      return null;
    }
    if (
      (!options.hasOwnProperty('constructor')) ||
      ('function' !== typeof options.constructor)
    ) {
      return null;
    }
    var Class = options.constructor;
    // inherit all the public properties of the parent prototype
    this.inheritClassPrototypeProperties(parent, Class);

    // inherit all the public properties of the parent Class
    this.inheritClassProperties(parent, Class);

    // add to prototype our public properties
    for (var key in options.public) {
      if (!options.public.hasOwnProperty(key)) {
        continue;
      }
      Class.prototype[key] = options.public[key];
    }

    return Class;
  },
  /**
   * Extend exsist prototype properties of class constructor Class
   * from prototype properties of class constructor parent
   *
   * @param {function} parent parent class constructor, which is for inheritance
   * @param {function} Class constructor, which extends
   * @return {function} Class constructor, which extended
   */
  inheritClassPrototypeProperties: function(parent, Class) {
    if ('function' !== typeof parent) {
      return null;
    }
    if ('function' !== typeof Class) {
      return null;
    }
    var FakeConstructor = function() {};
    // save prototypy properties from Class
    var obj = {};
    for (var key in Class.prototype) {
      if (!Class.prototype.hasOwnProperty(key)) {
        continue;
      }
      obj[key] = Class.prototype[key];
    }
    FakeConstructor.prototype = parent.prototype;
    Class.prototype = new FakeConstructor();
    // restore Class prototype properties
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      Class.prototype[key] = obj[key];
    }
    return Class;
  },
  /**
   * Add public props form class constructor parent into class constructor Class
   * ignore private properties, which started with symbol '_'
   *
   * @param {function} parent parent class constructor, which is for inheritance
   * @param {function} Class constructor, which extends for public properties of parent class
   * @return {function} Class constructor, whith new properties
   */
  inheritClassProperties: function(parent, Class) {
    if ('function' !== typeof parent) {
      return null;
    }
    if ('function' !== typeof Class) {
      return null;
    }
    for (var key in parent) {
      if (!parent.hasOwnProperty(key)) {
        continue;
      }
      // do not add private property
      // example class._private
      if ('_' === key[0]) {
        continue;
      }
      // add public class property
      Class[key] = parent[key];
    }
    return Class;
  }
};
