
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to mongodb server');
	}

	console.log('Connected to mongodb server');

	// delete many
	// db.collection('Users').deleteMany({name: 'Shaun'}).then((result) => {
	// 	console.log(result);
	// });

	// delete one
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// find one and delte
	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('593442c5c1cfdf0a4ef9e87b')
	}).then((result) => {
		console.log(result);
	});

	//db.close();
});