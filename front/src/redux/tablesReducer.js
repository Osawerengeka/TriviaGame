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
            {id: 1, type: "poker", description: "none", maxPlayers: 8},
            {id: 2, type: "trivia", description: "none", maxPlayers: 8},
            {id: 3, type: "trivia", description: "none", maxPlayers: 8},
            {id: 4, type: "poker", description: "none", maxPlayers: 8},
        ],
        newLobby: {id: 5, type: "poker", description: "none", maxPlayers: 8}
    }
};


export const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TABLE:
            let buff = {
                id: state.tables.newLobby.id,
                type: state.tables.newLobby.type,
                description: state.tables.newLobby.description,
                maxPlayers: state.tables.newLobby.maxPlayers
            };
            state.tables.listOfTables.push(buff);
            return state;
        case UPDATE_TABLES:
            state.tables.newLobby.id = action.newLobby.id;
            state.tables.newLobby.type = action.newLobby.type;
            state.tables.newLobby.description = action.newLobby.description;
            state.tables.newLobby.maxPlayers = action.newLobby.maxPlayers;
            return state;
        default:
            return state;
    }
}
