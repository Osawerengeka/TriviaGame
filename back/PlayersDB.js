const MongoClient = require("mongodb").MongoClient;

class PlayerDBClient {
	dburl = "mongodb://localhost:27017/";
	databaseName = 'WEB';
	playersCollectionName = 'players';
	mongoClient = new MongoClient(this.dburl, { useUnifiedTopology: true });
	static addPlayer(player) {
		mongoClient.connect(function(err, client){      
			if(err){
				return console.log(err)
			}
    			const db = client.db(this.databaseName);
    			const collection = db.collection(this.playersCollectionName);
			if(collection.findOne(player) != null) {
				client.close()
				return false;
			}
    			collection.insertOne(player, function(err, result){
        			if(err){ 
            			return console.log(err);
        			}
        			client.close();
				return "true"
    			});
		});
	};
	
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
};

module.exports = PlayerDBClient;
