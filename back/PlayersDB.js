const MongoClient = require("mongodb").MongoClient;   
const dburl = "mongodb://localhost:27017/";
const databaseName = 'WEB';
const playersCollectionName = 'players';
const mongoClient = new MongoClient(dburl, { useUnifiedTopology: true });

class PlayerDBClient {
	static addPlayer(player) {
		mongoClient.connect(function(err, client){      
			if(err){
				return console.log(err)
			}
    			const db = client.db(databaseName);
    			const collection = db.collection(playersCollectionName);
			if(collection.findOne(player) != null) {
				client.close()
				return false;
			}
    			collection.insertOne(player, function(err, result){
        			if(err){ 
            			return console.log(err);
        			}
        			console.log(result.ops);
        			client.close();
    			});
		});
	});
	
	findPlayer(player) {
		mongoClient.connect(function(err, client){      
			if(err){
				return console.log(err)
			}
    			const db = client.db(databaseName);
    			const collection = db.collection(playersCollectionName);
    			const findedPlayer = collection.findOne(player, function(err, result){
        			if(err){ 
            			return console.log(err);
        			}
        			console.log(result.ops);
        			client.close();
    			});
		});
		return findedPlayer;
	}
});

module.exports = PlayerDBClient;
