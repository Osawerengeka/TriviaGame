const MongoClient = require("mongodb").MongoClient;

class QandADBClient {
	dburl = "mongodb://localhost:27017/";
	getQandA(mongoClient) {
		mongoClient.connect(function(err, client){
			if(err){
				return console.log(err)
			}
			const db = client.db('WEB');
			const collection = db.collection('QandA');
			collection.find().toArray(function(err, results){
				client.close();
				return results[Math.floor(Math.random() * (results.length))];
			});
		});
	};
};

module.exports = QandADBClient;