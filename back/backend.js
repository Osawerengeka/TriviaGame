const WebSocketServer = new require('ws');
const PlayerDb = require('./PlayersDB');
const QAdb = require('./QandADB')
const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const players = new PlayerDb();
const QA = new QAdb();

// подключённые клиенты
const clients = {};

// WebSocket-сервер на порту 8081
const webSocketServer = new WebSocketServer.Server({
    port: 8081
});

webSocketServer.on('connection', function(ws) {

    const id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (const key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});
//пример как это работает закинул в качестве файлов example и exampleApp
//вообще работать должно, но как у тебя джсоны обрабатываются я не знаю так что слова "работает" означает что респонсится куда-то успешно.
app.get("/path1", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    players.findPlayer(request);
    response.send(players.findPlayer(request));
});
app.post("/path1", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    result = players.addPlayer(request);
    if (result != "true") response.send(result)
    response.send("sucessful operation");
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
