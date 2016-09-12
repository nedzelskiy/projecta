//var util = require('util');
// describe('Middleware setup', function() {
//
//   var app = require('../../../../app/config/middleware');
//
//   var returnLayer = function(layerName) {
//     return app._router.stack.filter(function(layer) {
//       return layer && layer.handle && layer.handle.name === layerName;
//     });
//   };
//
//   it('should load jsonParser', function(next) {
//     // use(bodyParser.json());
//     var layer = returnLayer('jsonParser');
//     expect(layer.length === 1).toBe(true);
//     next();
//   });
//
//   it('should load urlencodedParser', function(next) {
//     // use.(bodyParser.urlencoded({ extended: true })
//     var layer = returnLayer('urlencodedParser');
//     expect(layer.length === 1).toBe(true);
//     next();
//   });
//
//   it('should load router', function(next) {
//     // app.use(require('./routes'));
//     var layer = returnLayer('router');
//     expect(layer.length === 1).toBe(true);
//     next();
//   });
//
//   it('should load static', function(next) {
//     // app.use(express.static(...));
//     var layer = returnLayer('serveStatic');
//     expect(layer.length === 3).toBe(true);
//     next();
//   });
//
// });
