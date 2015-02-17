// app/models/todoModel.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	location : String,
	date : String,
	image : String,
	content : String,
	done : Boolean
});