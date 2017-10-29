'use strict';

var firebaseConfig = require('../configs/firebaseConfig');
var firebaseRef = firebaseConfig.ref;
var profileRef = firebaseRef.child('profiles');

var keyEmail = 'email';
var keyCreatedTime = 'created_time';
var keyUpdatedTime = 'updated_time';
var eventTypeValue = 'value';
var eventTypeChildAdded = 'child_added';

/** GET /get/:email
 * Get user profile by email
 */
exports.getProfileByEmail = function (req, res) {
    var email = req.params.email;

    profileRef.orderByChild(keyEmail)
        .equalTo(email)
        .limitToLast(1)
        .once(eventTypeValue)
        .then(function (data) {
            if(data.numChildren() === 1) {
                return res.status(200).send({
                    success: true,
                    message: 'Data found.',
                    data: data.toJSON()
                });
                console.log(data.toJSON());
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'No data found.'
                });
                console.log("Failed");
            }
        });
};

/** POST /create
 * Create new user profile
 */
exports.createProfile = function (req, res) {
    var profileData = req.body;
    profileData[keyCreatedTime] = new Date().toString();
    profileData[keyUpdatedTime]= new Date().toString();

    profileRef.push(profileData, function (error) {
        if (error) {
            return res.status(error.code).send({
                success: false,
                message: error.message
            });
        } else {
            return res.status(200).send({
                success: true,
                message: 'Create profile succeed.'
            });
        }
    });
};

/** PUT /update/:email
 * Update user profile by email
 */
exports.updateProfileByEmail = function (req, res) {
    var email = req.params.email;
    var profileDate = req.body;
    profileDate[keyUpdatedTime] = new Date().toString();

    profileRef.orderByChild(keyEmail)
        .equalTo(email)
        .limitToLast(1)
        .once(eventTypeValue)
        .then(function (data) {
           if(data.numChildren() === 1) {
               var userProfile = data.toJSON();
               var userProfileKey = Object.keys(userProfile)[0];

               if (userProfileKey) {
                   profileRef.orderByKey()
                       .equalTo(userProfileKey)
                       .once(eventTypeChildAdded)
                       .then(function (snapshot) {
                           snapshot.ref.update(profileDate)
                               .then(function () {
                                   return res.status(200).send({
                                       success: true,
                                       message: 'Update profile succeed.'
                                   });
                               }).catch(function(error) {
                               return res.status(error.code).send({
                                   success: false,
                                   message: error.message
                               });
                           });
                       })
               } else {
               // TODO:
               }
           } else {
               return res.status(404).send({
                   success: false,
                   message: 'No data found.'
               });
           }
        });
};
