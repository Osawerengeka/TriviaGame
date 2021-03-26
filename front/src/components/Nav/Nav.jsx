import React from "react";
import classes from "./Nav.module.css";
import {NavLink} from "react-router-dom";


function Nav() {
    return (
        <div className={classes.base}>
            <div>
                <NavLink to="/tablescreen/create" activeClassName={classes.nav}>Create Lobby</NavLink>
            </div>
            <div>
                <NavLink to="/tablescreen" activeClassName={classes.nav}>Current lobbies</NavLink>
            </div>
        </div>
    );
}

export default Nav