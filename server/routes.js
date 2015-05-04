// server/routes.js

var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = function(app) {

	// user routes
	var user = require('./controllers/user');
	app.post('/auth/user', user.create);
	app.get('/auth/user/:userId', user.find);

	// check if username is available
	app.get('/auth/check_username/:username', user.exists);

	// session routes
	var session = require('./controllers/session');
	app.get('/auth/session', session.session);
	app.post('/auth/session', session.login);
	app.delete('/auth/session', session.logout);

	// index page
	app.get('/', function(req, res) {
		res.render(path.join(appDir + '/public/index.html'));
	});

	// other
	app.get('/*', function(req, res) {
		res.redirect('/');
	});
};

