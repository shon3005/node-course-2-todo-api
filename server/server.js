require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT

// now we can send json to our express app
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		//console.log(doc);
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// always pass object not arrays through res.send
app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /todos/1234324
app.get('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	Todo.findOne({
		_id : req.params.id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		res.send({todo});

	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/todos/:id', authenticate, (req, res) => {
	// get the id
	var id = req.params.id;

	// validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}

	// remove todo by id
		// success
			// if no doc, send 404
			// if doc, send doc back with 200
		// error
			// 400 with empty body
	// find by id and creator
	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		res.send({todo});

	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	// if text exists, we wanna pull it off of body
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// POST /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then((user) => {
		return user.generateAuthToken();
		// res.send(user);
	}).then((token) => {
		// creating a custom header
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
	// res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	})
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = { app };

// save new something

// var newTodo = new Todo({
// 	text: 'Cook Dinner'
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save todo', e);
// });

// var otherTodo = new Todo({
// 	text: 'Something to do'
// });

// otherTodo.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save todo', e);
// });


// var user = new User({
// 	email: 'shon3005@gmail.com'
// });

// user.save().then((doc) => {
// 	console.log('User saved', doc);
// }, (e) => {
// 	console.log('Unable to save user', e);
// });
