'use strict';

exports.get = function (req, res) {
    res.render('index', { title: 'Express' });
};