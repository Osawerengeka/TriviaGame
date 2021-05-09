import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/redux-store";
import axios from "axios";
import {initUser} from "./redux/userReducer";
import {move} from "./MoveToGame";

window.store = store;

// const URLUsers = "http://localhost:3000/login";
//
// let user = {
//     name: "osa",
//     password: "jojo",
// }
//
// axios.post(URLUsers, user)
//     .then(response => {
//         console.log(response);
//         if (response.data == true) {
//             // let action = initUser(user);
//             // props.dispatch(action);
//             move("/feed");
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


export function rerenderEntireTree(state) {
    ReactDOM.render(
        <React.StrictMode>
            <App dispatch={store.dispatch.bind(store)} state={store.getState()} store = {store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
