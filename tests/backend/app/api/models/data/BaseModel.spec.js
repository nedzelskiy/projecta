var Model = require('../../../../../../app/api/models/data/BaseModel');
var dbMockup = {};

describe('BaseModel model', function() {
  it('should create a new model with default methods', function(next) {
    var model = new Model(dbMockup);

    expect(model.db).toBeDefined();
    expect(model.db).not.toBe(null);
    expect(model.setDB).toBeDefined();
    expect(Model.extend).toBeDefined();

    var model = new Model();
    expect(model.db).toBe(null);

    next();
  });
  it('class should be extendable', function(next) {
    var OtherTypeOfModel = Model.extend({
      constructor: function() {},
      public: {
        myCustomModelMethod: function() {}
      }
    });
    var model2 = new OtherTypeOfModel();

    expect(model2.myCustomModelMethod).toBeDefined();
    expect(model2.setDB).toBeDefined();
    expect(OtherTypeOfModel.extend).toBeDefined();

    next();
  });
  it('created model should be extendable', function(next) {
    var ModelSon = Model.extend({
      constructor: function() {
        this.mess = 'I am a son of model!';
      },
      public: {
        publicSonMethod: function() {
          return 'I am publicSonMethod!';
        }
      }
    });

    var ModelGrandson = ModelSon.extend({
      constructor: function() {
        this.mess = 'I am a grandson of model!';
      },
      public: {
        publicGrandsonMethod: function() {
          return 'I am publicGrandsonMethod!';
        }
      }
    });

    expect(ModelSon.extend).toBeDefined();
    expect(ModelGrandson.extend).toBeDefined();

    var son = new ModelSon();
    var grandson = new ModelGrandson();

    expect(son.setDB).toBeDefined();
    son.setDB('son db');
    expect(son.db).toBe('son db');
    expect(grandson.db).not.toBeDefined();
    expect(son.publicSonMethod).toBeDefined();
    expect(son.publicGrandsonMethod).not.toBeDefined();
    expect(son.mess).toBeDefined();
    expect(son.mess).toBe('I am a son of model!');
    expect(son.publicSonMethod()).toBe('I am publicSonMethod!');

    expect(grandson.setDB).toBeDefined();
    grandson.setDB('grandson db');
    expect(grandson.db).toBe('grandson db');
    expect(grandson.publicSonMethod).toBeDefined();
    expect(grandson.publicGrandsonMethod).toBeDefined();
    expect(grandson.mess).toBeDefined();
    expect(grandson.mess).toBe('I am a grandson of model!');
    expect(grandson.publicSonMethod()).toBe('I am publicSonMethod!');
    expect(grandson.publicGrandsonMethod()).toBe('I am publicGrandsonMethod!');

    next();
  });
});
