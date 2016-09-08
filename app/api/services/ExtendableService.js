'use strict';
module.exports = {
  /**
   * Extend exsist instance of model - add props to models prototype
   * @param {obj} nativePrototypeProperties which already exsists in model prototype
   * @param {obj} newProperties which added to model prototype
   * @return {obj} Object of new Object
   */
  createInheritance: function(nativePrototypeProperties, newPrototypeProperties) {
    var Child = nativePrototypeProperties;
    Child.prototype = nativePrototypeProperties.prototype;
    for (var key in newPrototypeProperties) {
      Child.prototype[key] = newPrototypeProperties[key];
    }
    return Child;
  }
};
