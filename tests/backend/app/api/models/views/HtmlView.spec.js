var View = require('../../../../../../app/api/models/views/HtmlView');
describe('Html view', function() {
  it('can create and render new view', function(next) {
    var responseMockup = {
      render: function(template, data) {
        expect(data.myProperty).toBe('value');
        expect(template).toBe('template-file');
        next();
      }
    };
    var v = new View(responseMockup);

    v.render('template-file', {
      myProperty: 'value'
    });
    next();
  });
  it('should have extend mehod', function(next) {
    expect(View.extend).toBeDefined();
    next();
  });
});
