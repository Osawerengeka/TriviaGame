//
// const WebSocketServer = new require('ws');
//
// // подключённые клиенты
// const clients = {};
//
// // WebSocket-сервер на порту 8081
// const webSocketServer = new WebSocketServer.Server({
//     port: 8081
// });
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

const http = require('http');
const st = require('node-static');
const file = new st.Server('.');

http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');