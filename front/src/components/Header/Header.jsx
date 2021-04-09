import React from 'react';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom'
import {Paper, Tab, Tabs} from "@material-ui/core";



export const Header = (props) => {

    return <Paper className={classes.header}>
        <Tabs
            //value={value}
            //onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Tables" onClick={ () => {window.location ="/tablescreen";}} />
            <Tab label="Current Game" onClick={ () => {window.location ="/gamescreen";}}/>
        </Tabs>
    </Paper>
}

