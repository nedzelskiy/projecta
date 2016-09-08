'use strict';
var ExtendableService = require('../services/ExtendableService');

/**
 * Set parameter db connect instance into model's property db
 * @param {obj} db db connect instance
 */
var setDbConnectionInstance = function(db) {
  this.db = db || null;
};

module.exports = setDbConnectionInstance;
module.exports.prototype = {
  extend: ExtendableService.createInheritance.bind(this, module.exports),
  setDB: setDbConnectionInstance,
  collection: function() {
    // in progress
  }
};
