'use strict';

var express = require('express');
var router = express.Router();
var firebase = require('../configs/firebase');
var user = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('GET users listing.');
});

module.exports = router;
