const MongoClient = require("mongodb").MongoClient;   
const dburl = "mongodb://localhost:27017/";
const databaseName = 'WEB';
const playersCollectionName = 'QandA';
const mongoClient = new MongoClient(dburl, { useUnifiedTopology: true });

class QandADBClient {
	static getQandA() {
		mongoClient.connect(function(err, client){      
			if(err){
				return console.log(err)
			}
    			const db = client.db(databaseName);
    			const collection = db.collection(playersCollectionName);
			if(collection.findOne(QA) != null) {
				client.close()
				return false;
			}
    			allQA = collection.find();
			arraySize = allQA.length;
			return allQA[getRandomInt(arraySize - 1)];
		});
	});
});

module.exports = PlayerDBClient;
