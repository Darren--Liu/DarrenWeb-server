'use strict';

// var auth = require('../controllers/authController');

/* Use idTokenVerfication middleware to verify a user token sent from client side */
// router.use(function (req, res, next) {
//    user.idTokenVerification(req, res, next);
// });

// /** Use accessTokenVerification middleware to verify a user with email
//  *
//  * NOTE: this is for develop environment only.
//  */
// var authentication = function (req, res, next) {
//     auth.accessTokenVerification(req, res, next);
//     next();
// };

exports.getUsers = function (req, res, next) {
    // authentication(req, res, next);
    res.send('GET users listing.');
};