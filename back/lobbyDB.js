class lobbyDB{
    function getAllLobby(mongoclient, response){
        mongoclient.connect(function (err, client) {
            if (err) {
                return response.send(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.find().toArray(function (err, results) {
                response.send(results);
            });
        });
    }

    function createLobby(mongoClient, response, lobby){
        mongoClient.connect(function (err, client) {
            if (err) {
                return response.send(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.insertOne(lobby, function (err, result) {
                if (err) {
                    return response.send(err);
                }
                response.send(true);
            });
        })
    }

    function addPlayerToLobby(mongoclient, response, newPlayerName, filter){
        mongoclient.connect(function (err, client) {
            if (err) {
                return response.send(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.findOne(filter, (err, item) => {
                if (err) {
                    return response.send(err);
                }
                let updateDocument;
                if (item.player2 === '' || item.player2 == null) {
                    updateDocument = {
                        $set: {
                            player2: newPlayerName
                        },
                    };
                } else if (item.player3 === '' || item.player3 == null) {
                    updateDocument = {
                        $set: {
                            player3: newPlayerName
                        },
                    };
                } else if (item.player4 === '' || item.player4 == null) {
                    updateDocument = {
                        $set: {
                            player4: newPlayerName
                        },
                    };
                } else response.send(false);
                collection.updateOne(filter, updateDocument, (err, result) => {
                    response.send(true);
                });
            });
        });
    }
    function closeLobby(mongoClient, response, delHostName){
        mongoClient.connect(function (err, client) {
            if (err) {
                return response.send(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.deleteOne({host: delHostName}, (err, item) => {
                if (err) {
                    return response.send(err)
                }
                response.send(true);
            });
        });
    }

    function exitFromLobby(mongoClient, response, delPlayerName, filter){
        mongoClient.connect(function (err, client) {
            if (err) {
                return response.send(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.findOne(filter, (err, item) => {
                if (err) {
                    return response.send(err)
                }
                let updateDocument;
                if (item.player2 == delPlayerName) {
                    updateDocument = {
                        $set: {
                            player2: ''
                        },
                    };
                } else if (item.player3 == delPlayerName) {
                    updateDocument = {
                        $set: {
                            player3: ''
                        },
                    };
                } else if (item.player4 == delPlayerName) {
                    updateDocument = {
                        $set: {
                            player4: ''
                        },
                    };
                } response.send(false);
                collection.updateOne(filter, updateDocument, (err, result) => {
                    response.send(true);
                });
            });
        });
    }
}

module.exports = lobbyDB;