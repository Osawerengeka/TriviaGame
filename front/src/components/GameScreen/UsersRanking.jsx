import React from "react";
import classes from "./UsersRanking.module.css";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

let ListofPlayers = (players) => {
    const defclasses = useStyles();

    return (
        <List className={defclasses.root + classes.usersRanking}>
            {players.map(el =>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="{el.name}" secondary="{el.points}"/>
            </ListItem>)}
        </List>)
}

function connect() {
    const URL = "ws://localhost:8081";
    const socket = new WebSocket(URL);
    socket.onopen = function () {
        alert("Соединение установлено co cnjhjys ");
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            alert('Соединение закрыто чисто');
        } else {
            alert('Обрыв соединения'); // например, "убит" процесс сервера
        }
        alert('Код: ' + event.code + ' причина: ' + event.reason);
    };
    socket.onmessage = function (event) {
        alert("Получены данные " + event.data);
    };

    socket.onerror = function (error) {
        alert("Ошибка " + error.message);
    };
}

export function UsersRanking(props) {
     // return <ListofPlayers/>;
    return null;
}
