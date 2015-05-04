// server/models/user.js
'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/**
 * User Schema
 */
var UserSchema = new mongoose.Schema({
	local: {
		email: {
			type: String,
			required: true,
			unique: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		admin: Boolean,
		guest: Boolean,
		provider: String
	},
	facebook         : {
		id           : String,
		token        : String,
		email        : String,
		name         : String
	},
	twitter          : {
		id           : String,
		token        : String,
		displayName  : String,
		username     : String
	},
	google           : {
		id           : String,
		token        : String,
		email        : String,
		name         : String
	}
});

/**
 * Virtual Propety
 */
UserSchema
	.virtual('user_info')
	.get(function () {
		return { '_id': this._id, 'username': this.local.username, 'email': this.local.email, 'password': this.local.password };
	});

/**
 * Validation
 */
// validate email format
UserSchema
	.path('local.email')
	.validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailRegex.test(email);
}, 'email is invalid');

// validate email duplication
UserSchema
	.path('local.email')
	.validate(function(value, respond) {
	mongoose.models["User"].findOne({'local.email': value}, function(err, user) {
		if(err) throw err;
		if(user) return respond(false);
		respond(true);
	});
}, 'email is already in use');

// validate username duplication
UserSchema
	.path('local.username')
	.validate(function(value, respond) {
	mongoose.models["User"].findOne({'local.username': value}, function(err, user) {
		if(err) throw err;
		if(user) return respond(false);
		respond(true);
	});
}, 'nickname is already in use');

// pre-save
UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		return next();
	}
	if (!validatePresenceOf(this.local.password)) {
		next(new Error('Invalid password'));
	}
	else {
		next();
	}
});

var validatePresenceOf = function (value) {
	return value && value.length;
};

// method
UserSchema.methods = {
	// generating a hashed password
	generateHash: function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},
	// authentication
	authenticate: function(password) {
		return bcrypt.compareSync(password, this.local.password);
	}
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);