'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/', controller.getUsers);

module.exports = router;