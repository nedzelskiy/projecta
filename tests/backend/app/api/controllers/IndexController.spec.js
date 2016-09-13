var IndexController = require('../../../../../app/api/controllers/IndexController');
var model = IndexController.startAppAction();

describe('IndexController', function() {
  it('should has name IndexController', function(next) {
    expect(IndexController.name).toBe('IndexController');
    next();
  });

  it('startAppAction should render view called index', function(next) {
    expect(model.template).toBe('index');
    next();
  });

  it('startAppAction should return model, which instance of BaseView', function(next) {
    var BaseView = require('../../../../../app/api/models/views/BaseView');
    expect(model instanceof BaseView).toBe(true);
    next();
  });

});
