'use strict';
var BaseView = require('./BaseView');

var HtmlView = BaseView.extend({
  constructor: function HtmlView(response) {
    BaseView.call(this, response);
    this.template = null;
  },
  public: {
    /**
     * extend the render method of Response object
     * @param {string} template name of view file
     * @param {obj} data data for render
     */
    render: function(template, data) {
      if (template) {
        this.template = template;
      }
      if (this.response && this.template) {
        this.response.render(this.template, data);
      }
    }
  }
});

module.exports = HtmlView;
