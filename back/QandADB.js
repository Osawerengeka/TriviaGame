const MongoClient = require("mongodb").MongoClient;

class QandADBClient {
	dburl = "mongodb://localhost:27017/";
	databaseName = 'WEB';
	playersCollectionName = 'QandA';
	mongoClient = new MongoClient(this.dburl, { useUnifiedTopology: true });
	static getQandA() {
		mongoClient.connect(function(err, client){      
			if(err){
				return console.log(err)
			}
    			const db = client.db(this.databaseName);
    			const collection = db.collection(this.playersCollectionName);
			if(collection.findOne(QA) != null) {
				client.close()
				return false;
			}
			const allQA = collection.find();
			return allQA[getRandomInt(allQA.length() - 1)];
		});
	};
};

module.exports = QandADBClient;
