import axios from "axios";

const ADD_TABLE = 'ADD-NEW-TABLE';
const UPDATE_TABLES = 'UPDATE-TABLES';

const GET_TABLES = 'GET-TABLES';

export const getTables = () => ({type: 'GET-TABLES'});

export const addNewLobby = () => ({type: 'ADD-NEW-TABLE'});

export const updateTablesPage = (newLobby) => (
    {
        type: 'UPDATE-TABLES',
        newLobby: newLobby
    }
);

let initialState = {
    tables: {
        listOfTables: [

        ],
        newLobby: {id: 5, name: "1", type: "trivia", description: "none", maxPlayers: 8}
    }
};


export const tablesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TABLE:
            let buff = {
                id: state.tables.newLobby.id,
                name: state.tables.newLobby.name,
                type: state.tables.newLobby.type,
                description: state.tables.newLobby.description,
                maxPlayers: state.tables.newLobby.maxPlayers
            };
            state.tables.listOfTables.push(buff);
            return state;
        case UPDATE_TABLES:
            state.tables.newLobby.id = action.newLobby.id;
            state.tables.newLobby.name = action.newLobby.name;
            state.tables.newLobby.type = action.newLobby.type;
            state.tables.newLobby.description = action.newLobby.description;
            state.tables.newLobby.maxPlayers = action.newLobby.maxPlayers;
            return state;
        case GET_TABLES:
            const URLUsers = "http://localhost:3001/getLobbies";
            axios.post(URLUsers, null)
                .then(res => {
                    state.tables.listOfTables = res.data;
                })
            return state
        default:
            return state;
    }
}
