import React from "react";
import classes from "./Tables.module.css";
import {move} from "../MoveToGame";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {addGame} from "../../../redux/gameReducer";

let addNewGame = (props, lobby) => {
    let action = addGame(lobby);
    props.dispatch.dispatch(action);

}

export function TableGame(props) {
    let lobby = {
        id: 1,
        name: props.name,
        type: props.type,
        description: props.description,
        maxPlayers: props.maxPlayers
    }
    return (
        <TableRow key={props.name} className={classes.tableBody} onClick={() => {
            addNewGame(props, lobby);
            move("/feed/gamescreen");
        }}>
            <TableCell component="th" scope="row">{props.name}</TableCell>
            <TableCell align="right">{props.type}</TableCell>
            <TableCell align="right">{props.description}</TableCell>
            <TableCell align="right">{"?/" + props.maxPlayers}</TableCell>
        </TableRow>
    )
}

export function Tables(props) {
    let len = props.tablesPage.tables.listOfTables.length;
    let tables = props.tablesPage.tables.listOfTables.map(el => <TableGame dispatch={props} name={el.name}
                                                                           type={el.type}
                                                                           description={el.description}
                                                                           maxPlayers={el.maxPlayers}/>)
    return (
        <Table className={classes.tableScreen}>
            <TableHead className={classes.tableHeader}>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Players</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tables}
            </TableBody>
        </Table>
    );
}
