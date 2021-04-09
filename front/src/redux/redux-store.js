import {tablesReducer} from "./tablesReducer"
import {gameReducer} from "./gameReducer";
import {createStore, combineReducers} from "redux"


let reducers = combineReducers({
    tablesPage: tablesReducer,
    gamePage: gameReducer
});

export let store = createStore(reducers);
