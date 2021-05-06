import {tablesReducer} from "./tablesReducer"
import {gameReducer} from "./gameReducer";
import {createStore, combineReducers} from "redux"
import {userReducer} from "./userReducer";


let reducers = combineReducers({
    tablesPage: tablesReducer,
    gamePage: gameReducer,
    user: userReducer
});

export let store = createStore(reducers);
