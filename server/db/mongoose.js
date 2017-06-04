var mongoose = require('mongoose');

// use the built in promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost: 27017/TodoApp');

module.exports = {
	mongoose: mongoose
};