'use strict';

var firebaseRef = require('../configs/firebase');
var profileRef = firebaseRef.child('profiles');

exports.getByEmail = function (req, res) {
    var email = req.params.email;
    var queryRef = profileRef.orderByChild('email').equalTo(email).limitToLast(1);
    queryRef.once("value")
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

exports.create = function (req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var avatar = req.body.avatar;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var linkedin_link = req.body.linkedin_link;
    var github_link = req.body.github_link;
    var position = req.body.position;

    var profileData =  {
        "first_name": first_name,
        "last_name": last_name,
        "avatar": avatar,
        "email": email,
        "mobile": mobile,
        "linkedin_link": linkedin_link,
        "github_link": github_link,
        "position": position,
        "created_time": new Date().toString()
    };

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