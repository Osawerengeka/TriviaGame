class PlayerDBClient {
	addPlayer(player, mongoClient) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			console.log("1");
			const db = client.db('WEB');
			const collection = db.collection('players');

			if(collection.findOne(player) != null) {
				console.log("1");
				client.close()
				return false;
			}
			console.log("11");
			collection.insertOne(player, function(err, result){
				if(err){
					console.log("111");
					return console.log(err);
				}
				client.close();
				return "true"
			});
		});
	};
	findPlayer(player, mongoClient) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			const db = client.db('WEB');
			const collection = db.collection('players');
			const findedPlayer = collection.findOne(player, function(err, result){
					if(err){

					return console.log(err);
				}
				console.log(result.ops);
				client.close();

			});
			return findedPlayer;
		});

	}
};

module.exports = PlayerDBClient;