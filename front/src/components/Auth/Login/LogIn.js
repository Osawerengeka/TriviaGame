import React, {useRef} from "react";
import classes from "./LogIn.module.css"
import {Link} from "react-router-dom";
import axios from 'axios';
import {initUser} from "../../../redux/userReducer";
import {updateTablesPage} from "../../../redux/tablesReducer";
import {move} from "../../TableScreen/MoveToGame";
import Button from "@material-ui/core/Button";

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

    let Login = () => {
        const URLUsers = "http://localhost:3000/login";
        let user = {
            name: userName.current.value,
            password: password.current.value,
        }

        let text;
        axios.post(URLUsers, user)
            .then(response => {
                console.log(response);
                if (response.data === true) {
                    let action = initUser(user);
                    props.dispatch(action);
                    move("/feed");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className={classes.container}>
            <section id={classes.content}>
                    <h1>Trivia Game</h1>
                    <h3>Log in</h3>
                    <div >
                        <input type="text" placeholder="Username" required="" ref={userName}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" required="" ref={password}/>
                    </div>
                    <div>
                        <Button className={classes.sub} onClick={() => {
                            Login();
                        }}>Log In
                        </Button>
                        <Button className={classes.sub} onClick={ () =>{
                            move("/register");
                        }}>Register</Button>
                    </div>
            </section>
        </div>
    )
}

