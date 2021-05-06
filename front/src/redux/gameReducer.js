import {isLobbyNotEnable} from "../components/Header/Header";


const ADD_GAME = 'ADD-NEW-GAME';

export const addGame = (lobby) => ({
    type: 'ADD-NEW-GAME', lobby: lobby});

let initialState = {
    game: {
        rounds: {
            question: [
                {topic: "test", question: "a ili b ili c ili d", ansVariants: ["a","b","c","d"], answer: "a"}
            ]
        },
        settings: {id: null, name: null, type: null, description: null, maxPlayers: null}
    },
    isLobbyNotEnable : true
};


export const gameReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_GAME:
            state.game.settings.id = action.lobby.id;
            state.game.settings.name = action.lobby.name;
            state.game.settings.type = action.lobby.type;
            state.game.settings.description = action.lobby.description;
            state.game.settings.maxPlayers = action.lobby.maxPlayers;
            state.isLobbyNotEnable = false;
            return state;
    }
    return state;
}