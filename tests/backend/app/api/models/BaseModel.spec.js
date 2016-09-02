var Model = require('../../../../../app/api/models/BaseModel');
var dbMockup = {};

describe('BaseModel model', function() {
  it('should create a new model with default methods', function(next) {
    var model = new Model(dbMockup);

    expect(model.db).toBeDefined();
    expect(model.db).not.toBe(null);
    expect(model.extend).toBeDefined();
    expect(model.setDB).toBeDefined();

    next();
  });
  it('created model should be extendable', function(next) {
    var model = new Model();
    expect(model.db).toBe(null);

    var OtherTypeOfModel = model.extend({
      myCustomModelMethod: function() {}
    });

    var model2 = new OtherTypeOfModel();

    expect(model2.db).toBeDefined();
    expect(model2.myCustomModelMethod).toBeDefined();
    next();
  });
});
