const WebSocketServer = new require('ws');
const PlayerDb = require('./PlayersDB');
var crypto = require('crypto');
const QAdb = require('./QandADB')
const express = require("express");
const bodyParser = require("body-parser");
const lobbydb = require('./lobyyDB');
const lobbies = new lobbydb();
const urlencodedParser = bodyParser.json();
const app = express();
const players = new PlayerDb();
const QA = new QAdb();
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, {useUnifiedTopology: true, autoIndex: false});

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/login", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    players.findPlayer(request.body, mongoClient, response);
});

app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    players.addPlayer(request.body, mongoClient, response);
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

    lobbies.createLobby(mongoClient, response, lobby);
})

app.post("/getLobbies", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    lobbies.getAllLobby(mongoClient, response);
});

app.post("/addPlayer", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let newPlayerName = request.body.name;
    let lobbyHostName = request.body.settings.host;
    //console.log(lobbyHostName, newPlayerName);
    let filter = {host: lobbyHostName}
    lobbies.addPlayerToLobby(mongoClient, response, newPlayerName, filter);
});


app.post("/closeLobby", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let delHostName = request.body.settings.host;
    lobbies.closeLobby(mongoClient, response, delHostName)
});
app.post("/exitLobby", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let delPlayerName = request.body.name;
    let lobbyHostName = request.body.settings.host;
    let filter = {host: lobbyHostName}

    lobbies.exitFromLobby(mongoClient, response,delPlayerName, filter)
});

app.listen(3001, function () {
    console.log('App listening at port 3001')
});