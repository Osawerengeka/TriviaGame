import React from "react";
 import classes from "./Tables.module.css";
import {move} from "./MoveToGame";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import  Link from "react-router-dom"
export function TableGame(props) {
    return (
                <TableRow key={props.name} className={classes.tableBody} onClick={move}>
                    <TableCell component="th" scope="row">
                        {props.name}
                    </TableCell>
                    <TableCell align="right">{props.type}</TableCell>
                    <TableCell align="right">{props.description}</TableCell>
                    <TableCell align="right">{props.maxPlayers + "/8"}</TableCell>
                </TableRow>
            )
}

export function Tables(props) {
    let tables = props.tablesPage.tables.listOfTables.map(el => <TableGame name={el.name} type={el.type}
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
            <TableBody >
                {tables}
            </TableBody>
        </Table>
    );
}
