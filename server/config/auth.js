// config/auth.js

'use strict';
// Route middleware to ensure user is authenticated
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/#/modal/login');
	//res.send(401);
}