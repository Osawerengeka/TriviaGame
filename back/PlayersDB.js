async function wait(){
	let x = await resolveAfter2Seconds(10);
	console.log(x);
}

function resolveAfter2Seconds(x){
	return new Promise(resolve => {
		setTimeout(()=>{
			resolve(x);
		}, 20000)
	})
}

class PlayerDBClient {
	addPlayer(player, mongoClient, response) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			let db = client.db('WEB');
			let collection = db.collection('players');
			let salt = crypto.randomBytes(16).toString('hex');
			let hash = crypto.pbkdf2Sync(player.password, salt, 1000, 64, `sha512`).toString(`hex`);
			collection.findOne({name: player.name}, (err, item) => {
				if (err) {
					console.log({'error':'An error has occurred'});
				}
				else{
					let newPlayer ={
						login: player.login,
						hash: hash,
						salt: salt
					}
					collection.insertOne(newPlayer, function(err, result){
						if(err){
							return console.log(err);
						}
						response.send(true);
					});
				}
			});
		});
	};
	async findPlayer(player, mongoClient, response) {
		await resolveAfter2Seconds();
		await mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			let db = client.db('WEB');
			let collection = db.collection('players');

			collection.findOne({name: player.name}, (err, item) =>{
				if(err){
					return console.log(err);
				}
				//console.log(item);
				let hash = crypto.pbkdf2Sync(player.password, item.salt, 1000, 64, `sha512`).toString(`hex`);
				if (hash == item.hash) response.send("true");
				else response.send("false");;
			});
		});
	}
};

module.exports = PlayerDBClient;