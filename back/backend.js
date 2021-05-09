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

// // подключённые клиенты
// const clients = {};
//
// // WebSocket-сервер на порту 8081
// const webSocketServer = new WebSocketServer.Server({
//     port: 8081
// });
//
// webSocketServer.on('connection', function(ws) {
//
//     const id = Math.random();
//     clients[id] = ws;
//     console.log("новое соединение " + id);
//
//     ws.on('message', function(message) {
//         console.log('получено сообщение ' + message);
//
//         for (const key in clients) {
//             clients[key].send(message);
//         }
//     });
//
//     ws.on('close', function() {
//         console.log('соединение закрыто ' + id);
//         delete clients[id];
//     });
//
// });


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
app.post("/getLobbies", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('lobby');
        collection.find().toArray(function (err, results) {
            console.log(results);
            response.send(results);
        });
    });

});
app.post("/path2", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    response.send(QA.getQandA());
});

app.listen(3001, function () {
    console.log('App listening at port 3001')
});
