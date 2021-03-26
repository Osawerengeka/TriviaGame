import React from 'react';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom'

export const Header = (props) => {
    return <header className={classes.header}>
        <ul className={classes.panel}>
            <li className={classes.li}>Poker</li>
            <li className={classes.li}>
                <NavLink to="/tablescreen" activeClassName={classes.nav}>Tables</NavLink>
            </li>
            <li className={classes.li}>
                <NavLink to="/gamescreen" activeClassName={classes.nav}>Current Game</NavLink>
            </li>
            <li className={classes.li}>{props.name}</li>
        </ul>
    </header>
}

