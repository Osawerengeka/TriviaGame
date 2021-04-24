import React from "react";
import classes from "./GameScreen.module.css";
import GameCard from "./GameCard";
import {UsersRanking} from "./UsersRanking";

function GameScreen(props) {
    return(
        <div className={classes.gameScreen}>
            <div className={classes.gameScreenGrid}>
            <GameCard question={props.gamePage.game.rounds.question}/>
            <UsersRanking/>
            </div>
        </div>
    );
}

export default GameScreen
