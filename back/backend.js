const WebSocketServer = new require('ws');
const PlayerDb = require('./PlayersDB');
const QAdb = require('./QandADB')
const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json();
const app = express();
const players = new PlayerDb();
const QA = new QAdb();
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, {useUnifiedTopology: true, autoIndex: false});

//пример как это работает закинул в качестве файлов example и exampleApp
//вообще работать должно, но как у тебя джсоны обрабатываются я не знаю так что слова "работает" означает что респонсится куда-то успешно.
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/login", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        const db = client.db('WEB');
        const collection = db.collection('players');
        collection.findOne(request.body, (err, item) => {
            if (item == null) {
                response.send(false)
            } else {
                response.send(true);
            }
        });
    });


});

app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        const db = client.db('WEB');
        const collection = db.collection('players');
        //ВНИМАТЕЛЬНО!!!! В СЛЕДУЮЩЕЙ СТРОЧКЕ ВМЕСТО name ДОЛЖНО БЫТЬ ПОЛЕ КОТОРЫМ ТЫ НАЗЫВАЕШЬ ЛОГИН!!!!!!!!!!!!!!
        collection.findOne({name: request.body.name}, (err, item) => {
            if (err) {
                console.log(err, {'error': 'An error has occurred'});
            } else {
                if (item != null) {
                    response.send(false);
                } else {
                    collection.insertOne(request.body, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        response.send(true);
                    });
                }
            }
        });
    });
})

app.post("/createLobby", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let lobby = {
        host: request.body.host,
        id: request.body.id,
        name: request.body.name,
        type: request.body.type,
        description: request.body.description,
        maxPlayers: request.body.maxPlayers,
        player2: '',
        player3: '',
        player4: ''
    }

    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('lobby');
        collection.insertOne(lobby, function (err, result) {
            if (err) {
                return console.log(err);
            }
            return true;
        });
    })
})

app.get("/getLobbies", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('lobby');
        collection.find().toArray(function (err, results) {
            response.send(results);
        });
    });

});

app.post("/addPlayer", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let newPlayerName = request.body.name;
    let lobbyHostName = request.body.settings.host;
    console.log(lobbyHostName, newPlayerName);
        let filter = {host: lobbyHostName}
        mongoClient.connect(function (err, client) {
            if (err) {
                return console.log(err)
            }
            let db = client.db('WEB');
            let collection = db.collection('lobby');
            collection.findOne(filter, (err, item) => {
                if (err) {
                    return console.log(err);
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
                } else return false;
                collection.updateOne(filter, updateDocument, (err, result) => {
                    return true;
                });
            });
        });
});


app.post("/closeLobby", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let delHostName = request.body.settings.host;

    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('lobby');
        collection.deleteOne({host: delHostName}, (err, item) => {
            if (err) {
                return console.log(err);
            }
            return true;
        });
    });
});
app.post("/exitLobby", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let delPlayerName = request.body.name;
    let lobbyHostName = request.body.settings.host;

    let filter = {host: lobbyHostName}
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('lobby');
        collection.findOne(filter, (err, item) => {
            if (err) {
                return console.log(err);
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
            } else return false;
            collection.updateOne(filter, updateDocument, (err, result) => {
                return true;
            });
        });
    });
});

app.listen(3001, function () {
    console.log('App listening at port 3001')
});
