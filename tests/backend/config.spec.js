describe('Configuration setup', function() {
  it('should load local configurations', function(next) {
    var config = require('../../app/config/config')();
    expect(config.mode).toBeDefined();
    expect(config.mode).toBe('development');
    next();
  });
  it('should load staging configurations', function(next) {
    var config = require('../../app/config/config')('prod');
    expect(config.mode).toBeDefined();
    expect(config.mode).toBe('production');
    next();
  });
});
