
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to mongodb server');
	}

	console.log('Connected to mongodb server');

	// find one and update
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('59344c81c82a3e09a5a398ac')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('593442c5c1cfdf0a4ef9e87b')
	}, {
		$set: {
			name: 'Shaun'
		},
		$inc: {
			age: 1, 
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})

	//db.close();
});