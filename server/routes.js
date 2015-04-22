// server/routes.js

var path = require('path');
var passport = require('passport');
var auth = require('./config/auth');
var appDir = path.dirname(require.main.filename);

// expose the routes to our expressApp with module.exports
module.exports = function(expressApp) {

// api ---------------------------------------------------------------------
	// process the signup form
	expressApp.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/#/profile', // redirect to the secure profile section
		failureRedirect : '/#/modal/signup', // redirect back to the signup page if there is an error
		failureFlash : true, // allow flash messages
		session: true
	}));

	// process the login form
	expressApp.post('/login', passport.authenticate('local-login', {
		successRedirect : '/#/profile', // redirect to the secure profile section
		failureRedirect : '/#/modal/login', // redirect back to the signup page if there is an error
		failureFlash : true, // allow flash messages
		session: true
	}));

	// User Routes
	var user = require('./controllers/user');
	expressApp.post('/auth/user', user.create);
	expressApp.get('/auth/user/:userId', user.show);

	// Check if username is available
	// todo: probably should be a query on users
	expressApp.get('/auth/check_username/:username', user.exists);

	// Session Routes
	var session = require('./controllers/session');
	expressApp.get('/auth/session', auth.ensureAuthenticated, session.session);
	expressApp.post('/auth/session', session.login);
	expressApp.delete('/auth/session', session.logout);

	// Log out
	expressApp.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	expressApp.get('/*', auth.ensureAuthenticated, function(req, res) {
		if(req.user) {
			res.cookie('user', JSON.stringify(req.user.user_info));
		}
		res.render(path.join(appDir + '/public/index.html'));
	});
};

