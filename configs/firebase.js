'use strict';

// Require Firebase admin module
var firebaseAdmin = require("firebase-admin");

// Initialize Firebase Admin SDK
// Fetch the service account key JSON file contents
var serviceAccount = require("./service_account");

// Initialize the app with a service account, granting admin privileges
var firebase = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://darrenweb-server.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebaseAdmin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

module.exports = firebase;