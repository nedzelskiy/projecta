var View = require('../../../../../../app/api/models/views/BaseView');
describe('Base view', function() {
  it('should be extendable', function(next) {
    var OtherView = View.extend({
      constructor: function() {},
      public: {
        render: function(data) {
          expect(data.prop).toBe('yes');
          next();
        }
      }
    });
    var otherViewInstance = new OtherView();
    expect(otherViewInstance.render).toBeDefined();
    otherViewInstance.render({
      prop: 'yes'
    });
    next();
  });
});
