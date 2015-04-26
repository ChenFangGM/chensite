// server.js (final)
// env config
var ENV = process.env.NODE_ENV || 'prod';

// set up ======================================================================
var express  = require('express');// create our app w/ express
var app = express();
var port     = process.env.PORT || 2010;                // set the port
var mongoose = require('mongoose');                     // mongoose for mongodb
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var fs = require('fs');

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var cookieParser = require('cookie-parser'); // express-cookies
var session = require('express-session'); //express-session
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mongoStore = require('connect-mongo')(session);

var configDB = require('./server/config/database');            // load the configDB config

// configuration ===============================================================
mongoose.connect(configDB.url);     // connect to mongoDB configDB on modulus.io
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function callback() { console.log('Database connected');});
db.on('disconnected', function () {
	mongoose.connect(configDB.url);
});

require('./server/config/passport')(passport); // pass passport for configuration

// set up express application
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// set view engine to ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// log every request to the console
app.use(morgan('dev'));
// cookieParser should be above session
app.use(cookieParser());
// bodyParser should be above methodOverride
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: 'true'}));            // parse application/x-www-form-urlencoded
app.use(methodOverride());

// express session storage, required for passport
app.use(session({
	secret: 'findyourloveingod',
	saveUninitialized: true,
	resave: true,
	store: new mongoStore({
		url: configDB.url,
		collection: 'sessions'
	})
}));
// persist user in sessions
app.use( function (req, res, next) {
	if ( req.method == 'POST' && req.url == '/#/modal/login' ) {
		if ( true ) {
			req.session.cookie.maxAge = 259200000; // 3*24*60*60*1000 persist 'user' for 3 days
		} else {
			req.session.cookie.expires = false;
		}
	}
	next();
});
// use passport session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./server/routes.js')(app); // load our routes and pass in our app and fully configured passport

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("Server listening on port " + port);