// server.js (final)

// set up ======================================================================
var express  = require('express');// create our expressApp w/ express
var expressApp = express();
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

var configDB = require('./server/config/database');            // load the configDB config

// configuration ===============================================================
mongoose.connect(configDB.url);     // connect to mongoDB configDB on modulus.io
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function callback() { console.log('Database connected');});

require('./server/config/passport')(passport); // pass passport for configuration

// set up express application
// set the static files location /public/img will be /img for users
expressApp.use(express.static(__dirname + '/public'));
// set view engine to ejs
expressApp.engine('html', require('ejs').renderFile);
expressApp.set('view engine', 'html');
// log every request to the console
expressApp.use(morgan('dev'));
// cookieParser should be above session
expressApp.use(cookieParser());
// bodyParser should be above methodOverride
expressApp.use(bodyParser.json());                                     // parse application/json
expressApp.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
expressApp.use(bodyParser.urlencoded({extended: 'true'}));            // parse application/x-www-form-urlencoded
expressApp.use(methodOverride());

// express session storage, required for passport
expressApp.use(session({
	secret: 'findyourloveingod',
	saveUninitialized: true,
	resave: true
}));
// persist user in sessions
expressApp.use( function (req, res, next) {
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
expressApp.use(passport.initialize());
expressApp.use(passport.session()); // persistent login sessions
expressApp.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./server/routes.js')(expressApp); // load our routes and pass in our app and fully configured passport

// listen (start expressApp with node server.js) ======================================
expressApp.listen(port);
console.log("Server listening on port " + port);