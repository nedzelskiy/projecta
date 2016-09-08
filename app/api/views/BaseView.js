'use strict';
var ExtendableService = require('../services/ExtendableService');

module.exports = function(response, template) {
  this.response = response;
  this.template = template;
};
module.exports.prototype = {
  extend: ExtendableService.createInheritance.bind(this, module.exports),
  /**
   * extend the render method of Response object
   * @param {obj} data data for render
   */
  render: function(data) {
    if (this.response && this.template) {
      this.response.render(this.template, data);
    }
  }
};
