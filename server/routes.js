// server/routes.js

var path = require('path');
var passport = require('passport');
var auth = require('./services/auth');
var appDir = path.dirname(require.main.filename);

// expose the routes to our app with module.exports
module.exports = function(app) {

	// user routes
	var user = require('./controllers/user');
	app.post('/auth/user', user.create);
	app.get('/auth/user/:userId', user.find);

	// check if username is available
	// todo: probably should be a query on users
	app.get('/auth/check_username/:username', user.exists);

	// session routes
	var session = require('./controllers/session');
	app.get('/auth/session', auth.ensureAuthenticated, session.session);
	app.post('/auth/session', session.login);
	app.delete('/auth/session', session.logout);

	// general
	app.get('/*', auth.ensureAuthenticated, function(req, res) {
		if(req.user) {
			res.cookie('user', JSON.stringify(req.user.user_info));
		}
		res.render(path.join(appDir + '/public/index.html'));
	});
};

