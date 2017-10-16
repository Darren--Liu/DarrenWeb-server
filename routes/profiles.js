'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/profilesController');

/** GET /get/:email
 * Get user profile by email
 */
router.get('/get/:email', controller.getProfileByEmail);

/** POST /create
 * Create new user profile
 */
router.post('/create', controller.createProfile);

/** PUT /update/:email
 * Update user profile by email
 */
router.put('/update/:email', controller.updateProfileByEmail);

module.exports = router;