// controller/session.js

'use strict';
var passport = require('passport');

exports.session = function (req, res, next) {
	if(req.user) {
		res.json(req.user.user_info);
	}else{
		res.status(400).send("Not logged in");
	}
};

exports.logout = function (req, res) {
	if(req.user) {
		req.logout();
		res.sendStatus(200);
	} else {
		res.status(400).send("Not logged in");
	}
};

exports.login = function (req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.status(401).json(error);
		}
		req.login(user, function(err) {
			if (err) { return res.status(400).json(err); }
			res.json(req.user.user_info);
		});
	})(req, res, next);
};