import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import classes from "./CreateTable.module.css";
import {Checkbox, TextField} from "@material-ui/core";
import {addNewLobby, updateTablesPage} from "../../../redux/tablesReducer"
import {connect} from "react-redux";


export function CreateTable(props) {

    function valuetext(value) {
        return `${value}°C`;
    }

    let buff = {
        id: props.tablesPage.tables.newLobby.id,
        name: props.tablesPage.tables.newLobby.name,
        type: props.tablesPage.tables.newLobby.type,
        description: props.tablesPage.tables.newLobby.description,
        maxPlayers: props.tablesPage.tables.newLobby.maxPlayers
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
        let action = addNewLobby();
        props.dispatch(action);
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
                <div  className={classes.slider}>
                 <Slider
                        id="slider"
                        defaultValue={4}
                        onChange={onchangeMaxPlayers}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={8}
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
            <div  onClick={addNewTable}>
                <Button variant="contained" color="primary">
                    Create lobby
                </Button>
            </div>
        </div>
    );
}