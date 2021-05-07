class PlayerDBClient {
	addPlayer(player, mongoClient) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			const db = client.db('WEB');
			const collection = db.collection('players');
			//ВНИМАТЕЛЬНО!!!! В СЛЕДУЮЩЕЙ СТРОЧКЕ ВМЕСТО name ДОЛЖНО БЫТЬ ПОЛЕ КОТОРЫМ ТЫ НАЗЫВАЕШЬ ЛОГИН!!!!!!!!!!!!!!
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
	};
	findPlayer(player, mongoClient) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			const db = client.db('WEB');
			const collection = db.collection('players');
			collection.find(player,(err, item) =>{
				client.close();
				if (item == null) return false;
				return true;
			});
		});

	}
};

module.exports = PlayerDBClient;