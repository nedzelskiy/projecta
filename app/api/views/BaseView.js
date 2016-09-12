'use strict';
var ExtendableService = require('../../services/ExtendableService');

module.exports = function(response) {
  this.response = response;
};
module.exports.prototype = {
  extend: ExtendableService.createInheritance.bind(this, module.exports),
};
