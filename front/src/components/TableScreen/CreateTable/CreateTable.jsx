import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import classes from "./CreateTable.module.css";
import {Checkbox, TextField} from "@material-ui/core";
import {addNewLobby, updateTablesPage} from "../../../redux/tablesReducer"
import {move} from '../../../MoveToGame';
import {addGame, connectTo} from "../../../redux/gameReducer";
import axios from "axios";
import {initUser} from "../../../redux/userReducer";

function addNewGame(props, lobby) {
    let action = addGame(lobby, props.name);
    props.dispatch(action);
}

function connect(props) {
    let action = connectTo(props.name);
    props.dispatch(action);
}


export function CreateTable(props) {

    function valuetext(value) {
        return `${value}°C`;
    }

    let buff = {
        id: props.tablesPage.tables.newLobby.id,
        name: props.tablesPage.tables.newLobby.name,
        type: props.tablesPage.tables.newLobby.type,
        description: props.tablesPage.tables.newLobby.description,
        maxPlayers: props.tablesPage.tables.newLobby.maxPlayers,
        host: props.host
    };

    let elementName = React.createRef();
    let elementType = React.createRef();
    let elementDesc = React.createRef();
    let elementPlayers = React.createRef();

    let onchangeName = () => {
        buff.name = elementName.current.value;
        let action = updateTablesPage(buff);
        props.dispatch(action);
    }

    let onchangeMaxPlayers = () => {
        buff.maxPlayers = parseInt(document.getElementById("slider").innerText);
        let action = updateTablesPage(buff);
        props.dispatch(action);
    }

    let addNewTable = () => {

        const URLUsers = "http://localhost:3001/createLobby";

        axios.post(URLUsers, buff)
            .then(response => {
                console.log(response);
                if (response.data === true) {
                    let action = addNewLobby();
                    props.dispatch(action);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className={classes.tableScreen}>
            <div className={classes.textField}>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                    Name
                </Typography>
                <textarea onChange={onchangeName} id="outlined-basic" ref={elementName}/>
            </div>
            <div>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                    Amount of Players
                </Typography>
                <div className={classes.slider}>
                    <Slider
                        id="slider"
                        defaultValue={4}
                        onChange={onchangeMaxPlayers}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={4}
                        valueLabelDisplay="auto"
                    /></div>
            </div>
            <div>
                <Typography>
                    Options
                    <Checkbox
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                    <label>Texas mode</label>
                    <Checkbox
                        color="primary"
                        inputProps={{'aria-label': 'secondary checkbox'}}
                    />
                    <label>Forever mode</label>
                </Typography>
            </div>
            <div onClick={() => {
                addNewTable();
                addNewGame(props, buff);
                connect(props);
                move("/feed/gamescreen");
            }}>
                <Button variant="contained" color="primary">
                    Create lobby
                </Button>
            </div>
        </div>
    );
}