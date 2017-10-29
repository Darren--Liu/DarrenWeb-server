'use strict';

var admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// Fetch the service account key JSON file contents
var serviceAccount = require("./service_account.json");

// Initialize the app with a service account, granting admin privileges
var firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://darrenweb-server.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

module.exports = { firebase, ref };
