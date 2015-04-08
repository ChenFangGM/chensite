// server/models/user.js
'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/**
 * User Schema
 */
var UserSchema = mongoose.Schema({
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
		name: String,
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
 * Virtual Property
 */
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.local.password = this.generateHash(password);
	})
	.get(function() {
		return this._password;
	});

UserSchema
	.virtual('user_info')
	.get(function () {
		return { '_id': this._id, 'username': this.local.username, 'email': this.local.email };
	});

/**
 * Validations
 */
var validatePresenceOf = function (value) {
	return value && value.length;
};
// validate email format
UserSchema.path('local.email').validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailRegex.test(email);
}, 'The specified email is invalid.');

// validate email duplication
UserSchema.path('local.email').validate(function(value, respond) {
	mongoose.models["User"].findOne({email: value}, function(err, user) {
		if(err) throw err;
		if(user){
			return respond(false);
		}else{
			return respond(true);
		}
	});
}, 'The specified email address is already in use.');

// validate username duplication
UserSchema.path('local.username').validate(function(value, respond) {
	mongoose.models["User"].findOne({username: value}, function(err, user) {
		if(err) throw err;
		if(user) return respond(false);
		respond(true);
	});
}, 'The specified username is already in use.');

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		return next();
	}
	if (!validatePresenceOf(this.password)) {
		next(new Error('Invalid password'));
	}
	else {
		next();
	}
});

/**
 * Methods
 */
UserSchema.methods = {
	// generating a hashed password
	generateHash: function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},
  // authentication
	validPassword: function(password) {
		if (!password){
			return '';
		}
		return bcrypt.compareSync(password, this.local.password);
	},
	// authentication
	authenticate: function(plainText) {
		return bcrypt.compareSync(plainText, this.local.password);
	}
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);