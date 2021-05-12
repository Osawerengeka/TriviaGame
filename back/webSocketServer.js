const ws = require('ws');
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
mongoClient = new MongoClient(dburl, {useUnifiedTopology: true, autoIndex: false});

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
    ws.roomID = -1;
    ws.name = 0;
    ws.points = 0;
    ws.aQ = [];
    ws.on('message', function (message) {
            message = JSON.parse(message)
            console.log(message);
            switch (message.event) {
                case 'postAnswer':
                    checkAnswer(message, ws);
                    break;
                case 'connection':
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
                    wss.clients.forEach(client => {
                        if (client.roomID === message.host) {
                            console.log(client.roomID);
                            console.log(client.name);
                            client.send(JSON.stringify(players));
                        }
                    });
                    break;
                case'getPlayers':
                    let p = {ev: 'getPlayers', items: []};
                    wss.clients.forEach(client => {
                        if (client.roomID === message.host) {
                            p.items.push({
                                name: client.name,
                                points: client.points
                            });
                        }
                    })
                    wss.clients.forEach(client => {
                        if (client.roomID === message.host) {
                            console.log(client.name);
                            ws.send(JSON.stringify(p));
                        }
                    });
                    break;
                case 'firstGetQuestion':
                    //функция высылки вопроса
                    postQforAll(ws.roomID);
                    break;
            }
        }
    )

    ws.on('error', e => console.log(e))
    ws.on('close', (e) => console.log('websocket closed ' + e))
})

function checkAnswer(message, ws) {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        const db = client.db('WEB');
        const collection = db.collection('QA');
        collection.findOne({id: message.id}, (err, item) => {
            if (item == null) {
                console.log("nothing");
                return false;
            } else {
                if (item.answer === message.answer) {
                    console.log("right");
                    postAboutAnswer(ws);
                } else {
                    console.log("wrong");
                    postAboutWrongAnswer(ws);
                }
                sendQA(ws);
            }
        });
    });
}

function postAboutAnswer(ws) {
    ws.points += 15;
    let p = {ev: 'getPlayers', items: []};
    wss.clients.forEach(client => {
        if (client.roomID === ws.roomID) {
            p.items.push({
                name: client.name,
                points: client.points
            });
        }
    })

    wss.clients.forEach(client => {
        if (client.roomID === ws.roomID) {
            client.send(JSON.stringify(p));
        }
    })
}

function postAboutWrongAnswer(ws) {
    ws.points -= 15;

    let p = {ev: 'getPlayers', items: []};
    wss.clients.forEach(client => {
        if (client.roomID === ws.roomID) {
            p.items.push({
                name: client.name,
                points: client.points
            });
        }
    })

    wss.clients.forEach(client => {
        if (client.roomID === ws.roomID) client.send(JSON.stringify(p));
    })
}

async function sendQA(c) {
    mongoClient.connect(function (err, client) {
        if (err) {
            return console.log(err)
        }
        let db = client.db('WEB');
        let collection = db.collection('QA');
        let searchQ = true;
        collection.find().toArray(function (err, results) {
            while(searchQ == true){
                searchQ = false;
                let res = results[Math.floor(Math.random() * results.length)];
                for(let i = 0; i < client.aQ.length; i++){
                    if (client.aQ[i] == res.id) searchQ = true;
                }
            }
            let Q = {ev: 'firstGetQuestion', items: res};
            client.aQ.push(res.id)
            c.send(JSON.stringify(Q));
        });
    });
}

function postQforAll(id) {
    wss.clients.forEach(client => {

        if (client.roomID === id) {
            sendQA(client);
        }
    })
}