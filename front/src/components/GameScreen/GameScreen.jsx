import React, {useRef, useState} from "react";
import classes from "./GameScreen.module.css";
import GameCard from "./GameCard";
import {UsersRanking} from "./UsersRanking";
import Button from "@material-ui/core/Button";
import {closeGame} from "../../redux/gameReducer";

let close = (props, lobby) => {
    let action = closeGame(lobby, props.name);
    console.log(props.dispatch);
    props.dispatch(action);
}

function start(props, settings) {
    console.log(props, settings);
    if (props.name === settings.host) {


    } else {
        alert("YOU ARE NOT HOST")
    }

}

function GameScreen(props) {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }


    return (
        <div className={classes.gameScreen}>
            <div className={classes.gameScreenGrid}>
                <GameCard question={props.gamePage.game.rounds.question}/>
                <UsersRanking/>
                <Button onClick={() => {
                    close(props, props.gamePage.game.settings);
                }} className={classes.exitButton} size="small" color="primary">exit</Button>
                <Button onClick={() => {
                    start(props, props.gamePage.game.settings);
                }} className={classes.startButton} size="small" color="primary">start</Button>
            </div>
        </div>
    );
}

export default GameScreen
