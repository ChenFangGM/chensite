// controller/session.js

'use strict';
var passport = require('passport');

exports.session = function (req, res) {
	res.json(req.user.user_info);
};

exports.logout = function (req, res) {
	req.logout();
	res.send(200);
};

exports.login = function (req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.status(400).json(error);
		}
		req.login(user, function(err) {
			if (err) {
				return res.send(err);
			}
			res.json(req.user.user_info);
		});
	})(req, res, next);
};