'use strict';
var _ = require('underscore');
module.exports = {
  name: 'BaseController',
  /**
   * extend the render method of Response object
   * @param {obj} data data for render
   */
  inherit: function(child) {
    return _.extend({}, this, child);
  }
};
