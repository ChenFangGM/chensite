// server/routes.js

var path = require('path');
var appDir = path.dirname(require.main.filename);
var auth = require('./config/auth');
// load the todo model
//var Todo = require('./models/todoModel');

// expose the routes to our expressApp with module.exports
module.exports = function(expressApp, passport) {

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
	var users = require('./controllers/users');
	expressApp.post('/auth/users', users.create);
	expressApp.get('/auth/users/:userId', users.show);

	// Check if username is available
	// todo: probably should be a query on users
	expressApp.get('/auth/check_username/:username', users.exists);

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


	/*// get all todos
	 expressApp.get('/api/todos', function(req, res) {

	 // use mongoose to get all todos in the configDB
	 Todo.find({}, null, {sort: {date: 1}}, function(err, todos) {

	 // if there is an error retrieving, send the error. nothing after res.send(err) will execute
	 if (err)
	 res.send(err)

	 res.json(todos); // return all todos in JSON format
	 });
	 });

	 // create todo and send back all todos after creation
	 expressApp.post('/api/todos', function(req, res) {
	 // create a todo, information comes from AJAX request from Angular
	 Todo.create({
	 location : req.body.location,
	 date : req.body.date,
	 image : req.body.image,
	 content : req.body.content,
	 done : false
	 }, function(err, todo) {
	 if (err)
	 res.send(err);

	 // get and return all the todos after you create another
	 Todo.find({}, null, {sort: {date: 1}}, function(err, todos) {
	 if (err)
	 res.send(err)
	 res.json(todos);
	 });
	 });
	 });

	 // delete a todo
	 expressApp.delete('/api/todos/:todo_id', function(req, res) {
	 Todo.remove({
	 _id : req.params.todo_id
	 }, function(err, todo) {
	 if (err)
	 res.send(err);

	 // get and return all the todos after you create another
	 Todo.find({}, null, {sort: {date: 1}}, function(err, todos) {
	 if (err)
	 res.send(err)
	 res.json(todos);
	 });
	 });
	 });*/
};

