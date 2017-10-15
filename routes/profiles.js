'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/profilesController');

/* GET user profile. */
router.get('/get/:email', controller.getByEmail);

/* POST create new user profile */
router.post('/create', controller.create);

module.exports = router;