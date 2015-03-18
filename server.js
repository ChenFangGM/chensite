// server.js (final)

// set up ======================================================================
var express  = require('express');
var expressApp = express();                               // create our expressApp w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var port     = process.env.PORT || 2010;                // set the port
var database = require('./config/db');            // load the database config

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

expressApp.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
expressApp.use(morgan('dev'));                                         // log every request to the console
expressApp.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
expressApp.use(bodyParser.json());                                     // parse application/json
expressApp.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
expressApp.use(methodOverride());

// routes ======================================================================
require('./app/routes.js')(expressApp);

// listen (start expressApp with node server.js) ======================================
expressApp.listen(port);
console.log("App listening on port " + port);