'use strict';
var BaseController = require('./BaseController');
var HtmlView = require('../models/views/HtmlView');

module.exports = BaseController.extend({
  name: 'IndexController',
  /**
   * the bootstrap of app from browser
   */
  startAppAction: function(req, res, next) {
    var model = new HtmlView(res);
    model.render('index');
    return model;
  }
});
