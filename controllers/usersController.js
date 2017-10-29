'use strict';

var auth = require('../controllers/authController');

var firebaseConfig = require('../configs/firebaseConfig');
var firebaseRef = firebaseConfig.ref
var userRef = firebaseRef.child('users');

/* Use idTokenVerfication middleware to verify a user token sent from client side */
var authentication = function (req, res) {
    auth.idTokenVerification(req, res);
};

// /** Use accessTokenVerification middleware to verify a user with email
//  *
//  * NOTE: this is for develop environment only.
//  */
// var authentication = function (req, res, next) {
//     auth.accessTokenVerification(req, res, next);
//     next();
// };

/** GET /get/
 * Get user info by email
 */
exports.getUsers = function (req, res) {
    var authStatus = auth.checkAuthStatus(req);
    return res.status(authStatus.code).send({
        success: authStatus.success,
        message: authStatus.message
    });
};

/** POST /login
 * Sign user by idToken
 */
exports.login = function (req, res) {
    authentication(req, res);
};
