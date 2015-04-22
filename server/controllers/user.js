'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
var ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res, next) {
	var newUser = new User();
	newUser.local.email    = req.body.local.email;
	newUser.local.username = req.body.local.username;
	newUser.local.password = newUser.generateHash(req.body.local.password);
	// save the user to database
	newUser.save(function(err) {
		if (err){
			throw err;
		}
		req.logIn(newUser, function(err) {
			if (err) {return next(err);}
			return res.json(newUser.user_info);
		});
	});
};

exports.show = function (req, res, next) {
  var userId = req.params.userId;

  User.findById(ObjectId(userId), function (err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({username: user.username, profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};

exports.exists = function (req, res, next) {
  var username = req.params.username;
  User.findOne({ username : username }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if(user) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
}
