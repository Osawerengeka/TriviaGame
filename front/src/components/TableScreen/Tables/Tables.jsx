import React, {useEffect, useState} from "react";
import classes from "./Tables.module.css";
import {move} from "../../../MoveToGame";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {addGame} from "../../../redux/gameReducer";
import axios from "axios";
import {getTables} from "../../../redux/tablesReducer";
import RefreshIcon from '@material-ui/icons/Refresh';
import {CircularProgress} from '@material-ui/core';

let addNewGame = (props, lobby) => {
    let action = addGame(lobby, props.name);
    props.dispatch.dispatch(action);
}

export function TableGame(props) {

    let lobby = {
        host: props.lobby.host,
        id: props.lobby.id,
        name: props.lobby.name,
        type: props.lobby.type,
        description: props.lobby.description,
        maxPlayers: props.lobby.maxPlayers,
    }
    return (
        <TableRow key={lobby.name} className={classes.tableBody} onClick={() => {
            addNewGame(props, lobby);
            move("/feed/gamescreen");
        }}>
            <TableCell component="th" scope="row">{lobby.name}</TableCell>
            <TableCell align="right">{lobby.type}</TableCell>
            <TableCell align="right">{lobby.description}</TableCell>
            <TableCell align="right">{"?/" + lobby.maxPlayers}</TableCell>
        </TableRow>
    )
}


let getLobbies = (props) => {
    let action = getTables();
    props.dispatch(action);
}

export function Tables(props) {

    let [lobbies, setLobbies] = useState(props.tablesPage.tables.listOfTables);
    let [fetching, setFetching] = useState(props.tablesPage.tables.isFetching)

    useEffect(() => {
        setLobbies(props.tablesPage.tables.listOfTables);
    }, [props.tablesPage.tables.listOfTables])

    useEffect(() => {
    setFetching(props.tablesPage.tables.isFetching);
    }, [props.tablesPage.tables.listOfTables])

    return (
        <Table className={classes.tableScreen}>
            <TableHead className={classes.tableHeader}>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Players</TableCell>
                    <TableCell align="right"><RefreshIcon onClick={() => {
                        getLobbies(props);
                    }}/></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {fetching === true &&
                <CircularProgress/>}
                {fetching === false &&
                lobbies.map(el => <TableGame name={props.name} dispatch={props} lobby={el}/>)}
            </TableBody>
        </Table>
    )
}
