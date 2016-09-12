'use strict';
var BaseView = require('./BaseView');

var HtmlView = BaseView.extend({
  constructor: function HtmlView(response) {
    BaseView.call(this, response);
  },
  public: {
    /**
     * extend the render method of Response object
     * @param {string} template name of view file
     * @param {obj} data data for render
     */
    render: function(template, data) {
      if (this.response && template) {
        this.response.render(template, data);
      }
    }
  }
});

module.exports = HtmlView;
