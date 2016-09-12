'use strict';
var ExtendableService = require('../../services/ExtendableService');

/**
 * Set parameter db connect instance into model's property db
 * @param {obj} db db connect instance
 */
var setDbConnectionInstance = function(db) {
  this.db = db || null;
};

setDbConnectionInstance.prototype = {
  setDB: setDbConnectionInstance,
  collection: function() {
    // in progress
  }
};
/**
 * Make inheritance.
 * Call method createModelInheritance with:
 * this = ExtendableService
 * parent = this - class constructor Model
 * @param {obj} options options for create new class constructor
 */
setDbConnectionInstance.extend = function(options) {
  return ExtendableService.createModelInheritance.bind(ExtendableService)(this, options);
};

module.exports = setDbConnectionInstance;
