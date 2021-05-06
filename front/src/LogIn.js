import React, {useRef} from "react";
import classes from "./LogIn.module.css"
import {Link} from "react-router-dom";
import axios from 'axios';
import {initUser} from "./redux/userReducer";
import {updateTablesPage} from "./redux/tablesReducer";
import {move} from "./components/TableScreen/MoveToGame";

export function LogIn(props) {
    let userName = React.createRef();
    let password = React.createRef();

    let response = {
        items: [
            {name: "OSA", id: 1, "hashpass": 123456},
            {name: "Kirill", id: 2, "hashpass": 123456},
            {name: "osa", id: 3, "hashpass": 123465}
        ],
    }

    let Auth = () => {
        const URLUsers = "http://localhost:3000/path1";
        let user = {
            name: userName.current.value,
            password: password.current.value
        }
        let text;

        // axios.get(URLUsers).then(response => text = response);
        axios.post(URLUsers,JSON.stringify(user))
        .then(response => {
            console.log(response);
            let action = initUser(user);
            props.dispatch(action);
            move("/feed");})
        .catch(function (error) {
            console.log(error);
        });
}

    return (
        <div className={classes.container}>
            <section id={classes.content}>
                <form>
                    <h1>Trivia Game</h1>
                    <h2>Log in</h2>
                    <div>
                        <input type="text" placeholder="Username" required="" ref={userName}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" required="" ref={password}/>
                    </div>
                    <div>
                        <button onClick={() => {
                            Auth();
                        }} className={classes.sub}>Log In
                        </button>
                        <a href="#">Lost your password?</a>
                        <a href="#">Register</a>
                    </div>
                </form>
            </section>
        </div>
    )
}

