const WebSocketServer = new require('ws');
const PlayerDb = require('./PlayersDB');
const QAdb = require('./QandADB')
const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const players = new PlayerDb();
const QA = new QAdb();
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, { useUnifiedTopology: true, autoIndex: false});
//
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

app.get("/path1", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    let res = players.findPlayer(request.body, mongoClient);
    response.send(res);
});

app.post("/path1", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.set();
    let result = players.addPlayer(request.body, mongoClient);
    console.log(result);
    if (result != "true") response.send(result)
    else {
        response.send(JSON.stringify("true"));
    }
});

app.get("/path2", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    response.send(QA.getQandA());
});
app.post("/path2", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    response.send(QA.getQandA());
});

app.listen(3000, function() {
    console.log('App listening at port 3000')
});