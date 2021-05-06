import classes from './App.css';
import React from "react";
import {Header} from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Nav from "./components/Nav/Nav.jsx";
import {Tables, TableGame} from "./components/TableScreen/Tables/Tables.jsx";
import GameScreen from "./components/GameScreen/GameScreen.jsx";
import {Router, Route, Switch} from "react-router-dom";
import {CreateTable} from "./components/TableScreen/CreateTable/CreateTable";
import history from "./history"
import {LogIn} from "./LogIn";

export function App(props) {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" render={() => {
                    return <LogIn dispatch={props.dispatch}/>}}/>
                <Route path="/feed"><div className="app-wrapper">
                    <Header isLobbyNotEnabled={props.state.gamePage.isLobbyNotEnable}/>
                    <Switch>
                        <Route exact path="/feed/tablescreen" render={ () => {
                            return <Tables tablesPage={props.state.tablesPage} dispatch={props.dispatch}/>
                        }}/>
                        <Route path="/feed/tablescreen/create" render={
                            () => {
                                return <CreateTable
                                    tablesPage={props.state.tablesPage}
                                    dispatch={props.dispatch}/>
                            }}
                        />
                        <Route path="/feed/gamescreen" render={() => {
                            return <GameScreen gamePage={props.state.gamePage} dispatch={props.dispatch}/>
                        }}/>
                        <Route path="feed/Profile" render={() => {
                            return <LogIn/>
                        }}/>
                    </Switch>
                    <Nav name={props.state.user.user.name} />
                    <Footer/>
                </div></Route>
            </Switch>
        </Router>
    );
}

