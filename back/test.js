const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, {useUnifiedTopology: true, autoIndex: false});
let player =
    {id: 3 ,topic: "География", question: "Территория какой из этих стран - наибольшая?", ansVariants: ["Германия","Италия","Япония","Финляндия"], answer: "Япония"}


mongoClient.connect(function (err, client) {
    if (err) {
        return console.log(err)
    }
    let db = client.db('WEB');
    let collection = db.collection('QA');
    collection.findOne((err, item) => {
        collection.insertOne(player, function (err, result) {
            if (err) {
                return console.log(err);
            }
            return true;
        });
    })
});


//Проверка на поиск

// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('players');
// 	collection.findOne(player, (err, item) =>{
// 		console.log(item);
// 		client.close();
// 	});
// });


// Проверка на получение рандомной ****

// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('players');
// 	let arr = new Array();
// 	collection.find().toArray(function(err, results){
// 		console.log(results[Math.floor(Math.random() * (results.length))]);
// 		client.close();
// 	});
// });

// Создание лобби

// let lobby = {
// 	host:'',
// 	player2:'',
// 	player3:'',
// 	player4:''
// }
//
// let hostName = player.name;
// lobby.host = hostName;
// mongoClient.connect(function (err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
//  	let collection = db.collection('lobby');
// 	collection.insertOne(lobby, function(err, result){
// 		if(err){
// 			return console.log(err);
// 		}
// 		client.close();
// 		return true;
// 	});
// })

//Возвращение списка лоббей

// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('lobby');
// 	collection.find().toArray(function(err, results){
//  		console.log(results);
//  		client.close();
//  	});
// });

//Добавление игрока в лобби

// let newPlayerName = 'Some2';
// let lobbyHostName = 'Lom';
// let filter = {host: lobbyHostName}
// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('lobby');
// 	collection.findOne(filter, (err, item) =>{
// 		if(err){
// 			return console.log(err);
// 		}
// 		let updateDocument;
// 		if(item.player2 == ''){
// 			updateDocument = {
// 				$set: {
// 					player2: newPlayerName
// 				},
// 			};
// 		}
// 		else if(item.player3 == ''){
// 			updateDocument = {
// 				$set: {
// 					player3: newPlayerName
// 				},
// 			};
// 		}
// 		else if(item.player4 == ''){
// 			updateDocument = {
// 				$set: {
// 					player4: newPlayerName
// 				},
// 			};
// 		}
// 		else return false;
// 		collection.updateOne(filter, updateDocument, (err,result) =>{
// 			return true;
// 		});
//  	});
// });

//Удаление лобби

// let delHostName = 'Lom'
//
// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('lobby');
// 	collection.deleteOne({host:delHostName}, (err, item) =>{
// 		if(err){
//  			return console.log(err);
//  		}
// 		return true;
// 	});
// });

//Удаление игрока из лобби

// let delPlayerName = 'Some'
// let lobbyHostName = 'Lom';
//  let filter = {host: lobbyHostName}
// mongoClient.connect(function(err, client){
// 	if(err){
// 		return console.log(err)
// 	}
// 	let db = client.db('WEB');
// 	let collection = db.collection('lobby');
// 	collection.findOne(filter, (err, item) =>{
// 		if(err){
// 			return console.log(err);
// 		}
// 		let updateDocument;
// 		if(item.player2 == delPlayerName){
// 			updateDocument = {
// 				$set: {
// 					player2: ''
// 				},
// 			};
// 		}
// 		else if(item.player3 == delPlayerName){
// 			updateDocument = {
// 				$set: {
// 					player3: ''
// 				},
// 			};
// 		}
// 		else if(item.player4 == delPlayerName){
// 			updateDocument = {
// 				$set: {
// 					player4: ''
// 				},
// 			};
// 		}
// 		else return false;
// 		collection.updateOne(filter, updateDocument, (err,result) =>{
// 			return true;
// 		});
// 	});
// });


//
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }
//
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }
//
// async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x);
// }
//
// async function f2() {
//     await f1();
//     let x = 3;
//     console.log(x);
// };
//
// f2();


