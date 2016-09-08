'use strict';
var express = require('express');
var router = express.Router();
var IndexController = require('../api/controllers/IndexController');

router.get('/', function(req, res, next) {
  IndexController.run(req, res, next);
});

module.exports = router;
