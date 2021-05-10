const ws = require('ws');
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, {useUnifiedTopology: true, autoIndex: false});

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
    ws.roomID = -1;
    //от 1 до 4, ну то есть если Хост то 1, если player2, то 2 и т.д.
    ws.playerNumber = 0;
    ws.points = 0;

    ws.on('message', function (message) {
        message = JSON.parse(message)
        console.log(message.host);
        switch (message.event) {
            case 'postAnswer':
                let check = checkAnswer(message);
                if (check === true) postAboutAnswer(ws.roomID, ws.playerNumber);
                else postAboutWrongAnswer(ws.roomID, ws.playerNumber);
                let Q = getQA();
                ws.send(Q);
                break;
            case 'connection':
                console.log(message + "connected");
                ws.roomID = message.host;
                ws.name = message.name;
                ws.points = 0;

                let players = {ev: 'getPlayers', items: []};
                wss.clients.forEach(client => {
                    if (client.roomID === message.host) {
                        players.items.push({
                            name: client.name,
                            points: client.points
                        });
                    }
                })
                console.log(players);
                ws.send(JSON.stringify(players));

                break;
            case 'getPlayers':
                // let players = {ev: 'getPlayers', items: []};
                // wss.clients.forEach(client => {
                //     if (client.roomID === message.host) {
                //         players.items.push({
                //             name: client.name,
                //             points: client.points
                //         });
                //
                //     }
                // })
                // ws.send(players);
                // break;
            case 'firstGetQuestion':
                //функция высылки вопроса
                postQforAll(ws.roomID);
                break;
        }
    })

    ws.on('error', e => console.log(e))
    ws.on('close', (e) => console.log('websocket closed ' + e))
})

function checkAnswer(message) {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        const db = client.db('WEB');
        const collection = db.collection('QandA');
        collection.findOne(message.qID, (err, item) => {
            if (item == null) {
                return false;
            } else {
                if (item.rightAnswer === message.answer) return true;
                else return false;
            }
        });
    });
}

function postAboutAnswer(id, playerID) {
    wss.clients.forEach(client => {
        //А что отправлять я пока не понел. (Решился на костыльный метод)
        let mes = {
            player: playerID,
            answer: 'true'
        }
        wss.clients.forEach(client => {
            if (client.roomID === id) client.send(mes);
        })
    })
}

function postAboutWrongAnswer(id, playerID) {
    let mes = {
        player: playerID,
        answer: 'false'
    }
    wss.clients.forEach(client => {
        if (client.roomID === id) client.send(mes);
    })
}

async function getQA() {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('QA');
        collection.find().toArray(function (err, results) {
            releaseWait();
            return results[Math.floor(Math.random() * (results.length))];
        });
    });
}

function postQforAll(id) {
    wss.clients.forEach(client => {
        let Q;
        if (client.roomID === id) {
            Q = getQA();
            client.send(Q);
        }
    })
}

