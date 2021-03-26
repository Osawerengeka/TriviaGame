import {tablesReducer} from "./tablesReducer"
import {createStore, combineReducers} from "redux"

let reducers = combineReducers({
    tablesPage: tablesReducer
});

export let store = createStore(reducers);
