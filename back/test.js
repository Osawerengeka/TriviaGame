const MongoClient = require("mongodb").MongoClient;
// const Math = require("math");
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, { useUnifiedTopology: true, autoIndex: false});
let player = {name: "jojo", password: "jojo"};

//Проверка на вставку

mongoClient.connect(function(err, client){
	if(err){
		return console.log(err)
	}
	const db = client.db('WEB');
	const collection = db.collection('players');
	collection.findOne({name: player.name}, (err, item) => {
		if (err) {
			console.log({'error':'An error has occurred'});
		} else {
			if(item != null) {
				client.close();
				return false;
			}
			else{
				collection.insertOne(player, function(err, result){
					if(err){
						return console.log(err);
					}
					client.close();
					return true;
				});
			}
		}
	});
});

//Проверка на поиск

// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	const db = client.db('WEB');
// 	const collection = db.collection('players');
// 	collection.findOne(player, (err, item) =>{
// 		console.log(item);
// 		client.close();
// 	});
// });


// Проверка на получение рандомной ****
//
// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	const db = client.db('WEB');
// 	const collection = db.collection('players');
// 	let arr = new Array();
// 	collection.find().toArray(function(err, results){
// 		console.log(results[Math.floor(Math.random() * (results.length))]);
// 		client.close();
// 	});
// });