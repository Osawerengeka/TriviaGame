import React, {useRef} from "react";
import classes from "./Register.module.css"
import axios from 'axios';
import {initUser} from "../../../redux/userReducer";
import {move} from "../../TableScreen/MoveToGame";
import Button from "@material-ui/core/Button";

export function Register(props) {
    let userName = React.createRef();
    let password = React.createRef();
    let password2 = React.createRef();

    let Register = () => {
        const URLUsers = "http://localhost:3000/register";
        let user = {
            name: userName.current.value,
            password: password.current.value,
        }
        if (password === password2) {
            axios.post(URLUsers, user)
                .then(response => {
                    console.log(response);
                    if (response.data === true) {
                        let action = initUser(user);
                        props.dispatch(action);
                        move("/feed");
                        alert('Registration passed successfully');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            alert('check your data');
        }
    }

    return (
        <div className={classes.container}>
            <section id={classes.content}>
                <h1>Trivia Game</h1>
                <h3>Registration</h3>
                <div>
                    <input type="text" placeholder="Username" required="" ref={userName}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" required="" ref={password}/>
                </div>
                <div>
                    <input type="password" placeholder="repeat Password" required="" ref={password2}/>
                </div>
                <div>
                    <Button className={classes.sub} onClick={() => {
                        Register();
                    }}>Register
                    </Button>
                </div>
            </section>
        </div>
    )
}

