import {isLobbyNotEnable} from "../components/Header/Header";
import {move} from "../MoveToGame"

import axios from "axios";

const ADD_GAME = 'ADD-NEW-GAME';
const CLOSE_GAME = 'CLOSE-GAME';

export const addGame = (lobby, name) => ({
    type: 'ADD-NEW-GAME', lobby: lobby, name: name
});

export const closeGame = (lobby, name) => ({
    type: 'CLOSE-GAME', lobby: lobby, name: name
});


let initialState = {
    game: {
        rounds: {
            question: [
                {topic: "test", question: "a ili b ili c ili d", ansVariants: ["a", "b", "c", "d"], answer: null}
            ]
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
        }
    },
    isLobbyNotEnable: true
};


export const gameReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_GAME:
            state.game.settings.host = action.lobby.host;
            state.game.settings.id = action.lobby.id;
            state.game.settings.name = action.lobby.name;
            state.game.settings.type = action.lobby.type;
            state.game.settings.description = action.lobby.description;
            state.game.settings.maxPlayers = action.lobby.maxPlayers;

            let data = {settings: state.game.settings, name: action.name}
            console.log(state.game.settings.host, action.name);
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



    }
    return state;
}