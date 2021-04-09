const ADD_TABLE = 'ADD-NEW-TABLE';
const UPDATE_TABLES = 'UPDATE-TABLES';

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
            {id: 1, name : "pognali", type: "trivia", description: "none", maxPlayers: 8},
            {id: 2, name : "pognali", type: "trivia", description: "none", maxPlayers: 8},
            {id: 3, name : "pognali", type: "trivia", description: "none", maxPlayers: 8},
            {id: 4, name : "pognali", type: "trivia", description: "none", maxPlayers: 8},
        ],
        newLobby: {id: 5, name : "1", type: "trivia", description: "none", maxPlayers: 8}
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
        default:
            return state;
    }
}
