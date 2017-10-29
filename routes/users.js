'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');

/** GET /
 *  Get users listing.
 */
router.get('/', controller.getUsers);

/** POST /login
 * Sign user by idToken
 */
router.post('/login', controller.login);

module.exports = router;
