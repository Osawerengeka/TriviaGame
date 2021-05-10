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

function GameScreen(props) {
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [players, setPlayers] = useState([]);


    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                name: props.name,
                host: props.gamePage.game.settings.host
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if(message.ev === "getPlayers"){
                setPlayers(message.items);
            }
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    function init() {
        const message = {
            event: 'getPlayers',
            name: props.name,
            host: props.gamePage.game.settings.host
        }
        socket.current.send(JSON.stringify(message))
    }

    function start(props, settings) {
        connect();
        if (props.name === props.gamePage.game.settings.host)
        {
            const message = {
                event: 'firstGetQuestion',
                roomID: props.gamePage.game.settings.host
            }
            socket.current.send(JSON.stringify(message))
        }
    }

    return (
        <div className={classes.gameScreen}>
            <div className={classes.gameScreenGrid}>
                <GameCard question={props.gamePage.game.rounds.question}/>
                {players.length !== 0 && <UsersRanking players={players}/>}
                <Button onClick={() => {
                    close(props, props.gamePage.game.settings);
                }} className={classes.exitButton} size="small" color="primary">exit</Button>
                {props.name === props.gamePage.game.settings.host && <Button onClick={() => {
                    start(props, props.gamePage.game.settings);
                    // init(props, props.gamePage.game.settings);
                }} className={classes.startButton} size="small" color="primary">start</Button>}

                {props.name !== props.gamePage.game.settings.host && <Button onClick={() => {
                    start(props, props.gamePage.game.settings);
                    // init(props, props.gamePage.game.settings);
                }} className={classes.startButton} size="small" color="primary">init</Button>}

            </div>
        </div>
    );
}

export default GameScreen
