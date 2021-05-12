import {isLobbyNotEnable} from "../components/Header/Header";
import {move} from "../MoveToGame"
import axios from "axios";


const POST_ANSWER ='POST-ANSWER';
const ADD_GAME = 'ADD-NEW-GAME';
const CLOSE_GAME = 'CLOSE-GAME';
let CONNECT_TO = 'CONNECT_TO';
const GET_Q = "GET_Q";

export const postAnswer = (id, answer) => ({
    type: 'POST-ANSWER', answer: answer, id: id
});

export const getQ = (roomId, name) => ({
    type: 'GET_Q', roomId: roomId, name: name
});

export const addGame = (lobby, name) => ({
    type: 'ADD-NEW-GAME', lobby: lobby, name: name
});

export const closeGame = (lobby, name) => ({
    type: 'CLOSE-GAME', lobby: lobby, name: name
});

export const connectTo = (name) => ({
    type: 'CONNECT_TO', name: name
});

let initialState = {
    game: {
        rounds: {
            question: null
        },
        settings: {
            host: null,
            id: null,
            name: null,
            type: null,
            description: null,
            maxPlayers: null,
            player2: '',
            player3: '',
            player4: ''
        },
        players: [],
        socket: null
    },
    isLobbyNotEnable: true
};


export const gameReducer = (state = initialState, action) => {
    let waitForConnection = function (callback, interval) {
        if (state.socket.readyState === 1) {
            callback();
        } else {
            setTimeout(function () {
                waitForConnection(callback, interval);
            }, interval);
        }
    };

    let send = function (message) {
        waitForConnection(function () {
            state.socket.send(message);
        }, 500);
    };

    switch (action.type) {
        case ADD_GAME:
            state.game.settings.host = action.lobby.host;
            state.game.settings.id = action.lobby.id;
            state.game.settings.name = action.lobby.name;
            state.game.settings.type = action.lobby.type;
            state.game.settings.description = action.lobby.description;
            state.game.settings.maxPlayers = action.lobby.maxPlayers;

            let data = {settings: state.game.settings, name: action.name}
            if (state.game.settings.host !== action.name) {
                const URLUsers = "http://localhost:3001/addPlayer";
                axios.post(URLUsers, data)
                    .then(res => {
                    })
                state.isLobbyNotEnable = false;
            }
            return state;

        case CLOSE_GAME:
            if (state.game.settings.host === action.name) {
                const URL = "http://localhost:3001/closeLobby";

                let data = {settings: state.game.settings, name: action.name}
                axios.post(URL, data)
                    .then(res => {
                        state.tables.listOfTables = res.data;
                    })
                move("/feed");
            } else if (action.name != null) {
                const URL = "http://localhost:3001/exitLobby";
                let data = {settings: state.game.settings, name: action.name}
                axios.post(URL, data)
                    .then(res => {
                        state.tables.listOfTables = res.data;
                    })
                move("/feed");
            }
            state.isLobbyNotEnable = true;
            return state;

        case CONNECT_TO:
            state.socket = new WebSocket('ws://localhost:5000')
            state.socket.onopen = () => {
                const message = {
                    event: 'connection',
                    name: action.name,
                    host: state.game.settings.host
                }
                send(JSON.stringify(message))
            }
            state.socket.onmessage = (event) => {
                const message = JSON.parse(event.data)
                if (message.ev === 'getPlayers') {
                    console.log(message);
                    state.game.players = message.items;
                    console.log(message.items);
                } else if (message.ev === "firstGetQuestion") {
                    state.game.rounds.question = message.items;
                }
            }
            state.socket.onclose = () => {
                console.log('Socket закрыт')
            }
            state.socket.onerror = () => {
                console.log('Socket произошла ошибка')
            }
            break;
        case GET_Q:
            if (action.name === action.roomId) {

                const message = {
                    event: 'firstGetQuestion',
                    roomID: action.roomId
                }
                console.log("GETQ");
                send(JSON.stringify(message))
            }
            break;
        case POST_ANSWER:
            const message = {
                event: 'postAnswer',
                id: action.id,
                answer: action.answer,
                roomID: action.roomId
            }
            send(JSON.stringify(message))
            break;
    }
    return state;
}