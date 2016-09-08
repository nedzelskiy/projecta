'use strict';
var _ = require('underscore');
module.exports = {
  name: 'BaseController',
  /**
   * extend the render method of Response object
   * @param {obj} data data for render
   */
  extend: function(child) {
    return _.extend({}, this, child);
  },
  /**
   * Middleware Express For Controllers
   * @param {obj} req Request Object
   * @param {res} res Response Object
   * @param {res} nex Response Object
   */
  run: function(req, res, next) {

  }
};
