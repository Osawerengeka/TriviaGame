import React from "react";
 import classes from "./UsersRanking.module.css";
import { makeStyles } from '@material-ui/core/styles';
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

let a = (users) => {
    return users.map(a =>
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <ImageIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={a.name} secondary={a.points} />
    </ListItem>)

}

export function UsersRanking(props) {
    const defclasses = useStyles();
    // const URL = "";
    // const socket = new WebSocket(URL);
    // socket.onopen = function() {
    //     alert("Соединение установлено.");
    // };
    //
    // socket.onclose = function(event) {
    //     if (event.wasClean) {
    //         alert('Соединение закрыто чисто');
    //     } else {
    //         alert('Обрыв соединения'); // например, "убит" процесс сервера
    //     }
    //     alert('Код: ' + event.code + ' причина: ' + event.reason);
    // };
    // socket.onmessage = function(event) {
    //     alert("Получены данные " + event.data);
    // };
    //
    // socket.onerror = function(error) {
    //     alert("Ошибка " + error.message);
    // };

    return (<div>
        <List className={defclasses.root + classes.usersRanking}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
        </List>
    </div>);
}
