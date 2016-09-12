'use strict';
var ExtendableService = require('../../services/ExtendableService');

var BaseView = function(response) {
  this.response = response;
};

BaseView.extend = function(options) {
  return ExtendableService.createModelInheritance.bind(ExtendableService)(this, options);
};

module.exports = BaseView;
