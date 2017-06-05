const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove
Todo.findOneAndRemove({id: '5934b46ad202610c9a28be85'}).then((todo) => {

});

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5934b46ad202610c9a28be85').then((todo) => {
	console.log(todo);
});
