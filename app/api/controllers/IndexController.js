'use strict';
var BaseController = require('./BaseController');
var BaseView = require('../views/BaseView');

module.exports = BaseController.extend({
  name: 'IndexController',
  run: function(req, res, next) {
    var model = new BaseView(res, 'index');
    model.render();
  }
});
