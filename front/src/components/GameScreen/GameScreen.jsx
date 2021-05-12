import React, {useEffect, useRef, useState} from "react";
import classes from "./GameScreen.module.css";
import GameCard from "./GameCard";
import {UsersRanking} from "./UsersRanking";
import Button from "@material-ui/core/Button";
import {closeGame, connectTo, getQ} from "../../redux/gameReducer";

let close = (props, lobby) => {
    let action = closeGame(lobby, props.name);
    props.dispatch(action);
}

let getFirstQuestion = (props) => {
    let action = getQ(props.gamePage.game.settings.host, props.name);
    props.dispatch(action);
}

let waitForConnection = function (callback, interval) {
        callback();
        setTimeout(function () {
            waitForConnection(callback, interval);
        }, interval);
    }

let f = function (callback) {
    waitForConnection(function () {
        callback();
    }, 1000);
};

class GameScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    check() {
        this.forceUpdate();
    }
    componentDidMount() {
        this.interval = setInterval(() => { this.check();}, 1500);
    }
    render() {
        return (
            <div className={classes.gameScreen}>
                <div className={classes.gameScreenGrid}>
                    <GameCard props={this.props} question={this.props.gamePage.game.rounds.question}/>
                    {this.props.gamePage.game.players.length !== 0 && <UsersRanking players={this.props.gamePage.game.players}/>}
                    <Button onClick={() => {
                        close(this.props, this.props.gamePage.game.settings);
                    }} className={classes.exitButton} size="small" color="primary">exit</Button>

                    {this.props.name === this.props.gamePage.game.settings.host && <Button onClick={() => {
                        getFirstQuestion(this.props);
                    }} className={classes.startButton} size="small" color="primary">start</Button>}
                </div>
            </div>
        );
    }
}

export default GameScreen
