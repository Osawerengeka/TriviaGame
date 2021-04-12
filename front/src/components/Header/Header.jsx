import React from 'react';
import classes from './Header.module.css';
import {Link} from 'react-router-dom'
import {Paper, Tab, Tabs} from "@material-ui/core";



export const Header = (props) => {

    return <Paper className={classes.header}>
        <Tabs
            indicatorColor="primary"
            textColor="primary"
        >
            <Tab value="Create new Game" label="Create new Game" component={Link} to="/tablescreen/create" />
            <Tab value="Tables" label="Tables"  component={Link} to="/tablescreen" />
            <Tab value="Current Game" label="Current Game"   component={Link} to="/gamescreen"/>
        </Tabs>
    </Paper>
}

