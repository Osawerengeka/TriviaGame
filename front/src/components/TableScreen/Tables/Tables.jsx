import React from "react";
 import classes from "./Tables.module.css";
import {move} from "./MoveToGame";

export function TableGame(props) {
    return (
        <div onClick={move} className={classes.tableBody}>
            <span>{props.name}</span>
            <span>{props.type}</span>
            <span>{props.description}</span>
            <span>{props.maxPlayers + "/8"}</span>
        </div>
    );
}

export function Tables(props) {
    let tables = props.tablesPage.tables.listOfTables.map(el => <TableGame name={el.name} type={el.type}
                                                                           description={el.description}
                                                                           maxPlayers={el.maxPlayers}/>)
    return (
        <div className={classes.tableScreen}>
            <div className={classes.tableHeader}>
                <span >Name</span>
                <span >Type</span>
                <span >Description</span>
                <span >Players</span>
            </div>
                {tables}
        </div>
    );
}
