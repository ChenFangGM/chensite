// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
	// used to serialize the user to the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findOne({'_id': id}, function(err, user) {
			done(err, user);
		});
	});

	/**
	 * Login Strategy
	 */
	passport.use('local-login', new LocalStrategy({
			// override username filed with email
			usernameField : 'email',
			passwordField : 'password'
		},
		function(email, password, done) {
			User.findOne({ 'local.email' :  email }, function(err, user) {
				// database error
				if (err) { return done(err); }
				// no user found
				if (!user){
					return done(null, false, {
						'errors':{
							'email': {message: 'email is not registered.'}
						}
					});
				}
				// wrong password
				if (!user.authenticate(password)) {
					return done(null, false, {
						'errors':{
							'password': {message: 'password is incorrect.'}
						}
					});
				}
				// success
				return done(null, user);
			});
		}));

	/**
	 * Check Authentication
	 * :Route middleware to ensure user is authenticated
	 */
	passport.ensureAuthenticated = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}else{
			res.status(401).send('User does not log in!');
		}
	};

};