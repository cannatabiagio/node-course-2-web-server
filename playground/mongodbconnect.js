//const MongoClient = require('mongodb').MongoClient;
//la variabiale MongoCLient avrà il valore dell'attributo MongoClient dell'oggetto mongodb richiesto che è esattamente
//Ciò che viene fatto su
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();


/*uso il protocollo mongodb */
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}

	console.log('Connect to MongoDB server');

	//Prende come argomento il nome della collection; InsertOne inserisce un nuovo elemento nella collezione

	/*
	db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	}, (err,result) => {
		if(err){
			return console.log('Unable to insert todo', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	*/
	
	db.collection('Users').insertOne({
		name: 'Biagio',
		age: 23,
		location: 'Monfalcone'
	}, (err,result) =>{
		if(err){
			console.log('Unable to insert users', err);
		}

		console.log(JSON.stringify(result.ops,undefined,2));
	})

	//Chiude la connessione al database
	db.close();
});