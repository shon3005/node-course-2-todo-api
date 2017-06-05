var mongoose = require('mongoose');

// use the built in promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
	mongoose: mongoose
};
