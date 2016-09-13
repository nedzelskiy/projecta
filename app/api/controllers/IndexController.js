'use strict';
var BaseController = require('./BaseController');
var HtmlView = require('../models/views/HtmlView');

module.exports = BaseController.extend({
  name: 'IndexController',
  /**
   * the bootstrap of app from browser
   *
   * @return {obj} Model instanceof BaseView
   */
  startAppAction: function(req, res, next) {
    var model = new HtmlView(res);
    model.render('index');
    return model;
  }
});
