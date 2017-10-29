'use strict';

var express = require('express');
var router = express.Router();
var firebaseConfig = require('../configs/firebaseConfig');

/** Route middleware to verify user by IdToken
 *
 * This method is used to verify an id token retrieved from client side
 * after a user successfully logged in
 *
 */
exports.idTokenVerification = router.use(function (req, res) {
    // check header or url parameters or post parameters for token
    var idToken = (req.body && req.body.access_token)
        || (req.query && req.query.access_token)
        || req.headers['x-access-token'];

    if(idToken) {
        // Verify firebase auth token.
        firebaseConfig.firebase.auth().verifyIdToken(idToken)
            .then(function(decodedToken) {
                var uid = decodedToken.uid;
                req.session.user = decodedToken;
                return res.status(200).send({
                    success: true,
                    message: "decodedToken uid: " + uid
                });
            }).catch(function(error) {
                // If token authentication failed return an error
                return res.status(401).send({
                    success: false,
                    message: error.message
                });
            });
    } else {
        // If there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

/** Route middleware to verify user by email
 *
 * This method is used to verify user by email and generate and authenticate an access token
 * NOTE: this method is only used for develop environment.
 *
 */
// // Generate access token
// var google = require("googleapis");
// // Load the service account key JSON file.
// var serviceAccount = require('../configs/service_account.json');
// // Define the required scopes.
// var scopes = [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/firebase.database"
// ];

// exports.accessTokenVerification = router.use(function (req, res, next) {
//     var adminUser = require('../configs/custom_token.json');
//     var loginEmail = req.body.email || req.query.email || req.headers['email'];
//     if(loginEmail == adminUser.email) {
//         // Authenticate a JWT client with the service account.
//         var jwtClient = new google.auth.JWT(
//             serviceAccount.client_email,
//             null,
//             serviceAccount.private_key,
//             scopes
//         );
//         // Use the JWT client to generate an access token.
//         jwtClient.authorize(function(error, tokens) {
//             if (error) {
//                 console.log("Error making request to generate access token:", error);
//                 // If firebase return an error
//                 return res.status(403).send({
//                     success: false,
//                     message: 'Authentication failed.'
//                 });
//             } else if (tokens.access_token === null) {
//                 console.log("Provided service account does not have permission to generate access tokens");
//                 // If there is no token returned, return an error
//                 return res.status(403).send({
//                     success: false,
//                     message: 'No token provided.'
//                 });
//             } else {
//                 // Authenticate success
//                 var accessToken = tokens.access_token;
//                 next();
//             }
//         });
//     } else {
//         // If there is no email return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No email.'
//         });
//     }
// });

/**
 * Route middleware to check user authentication status
 */
exports.checkAuthStatus = router.use(function (req) {
    if(!req.session) {
        return {
            success: false,
            code: 401,
            message: "User is not logged in."
        }
    } else {
        return {
            success: true,
            code: 200,
            message: "User is authenticated."
        }
    }
});
