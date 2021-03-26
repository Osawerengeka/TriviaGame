import classes from './App.css';
import React from "react";
import {Header} from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Nav from "./components/Nav/Nav.jsx";
import {Tables,TableGame} from "./components/TableScreen/Tables/Tables.jsx";
import GameScreen from "./components/GameScreen/GameScreen.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {CreateTable} from "./components/TableScreen/CreateTable/CreateTable";


export function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header name="Gevorkian George"/>
                <Switch>
                    <Route exact path="/tablescreen" render={ () => {return <Tables tablesPage = {props.state.tablesPage}/>}}/>
                    <Route path="/tablescreen/create" render={
                        () => {return <CreateTable
                            tablesPage = {props.state.tablesPage}
                            dispatch = {props.dispatch} />}}
                    />
                    <Route path="/gamescreen" render={() => {return <GameScreen />}}/>
                </Switch>
                <Nav/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}
