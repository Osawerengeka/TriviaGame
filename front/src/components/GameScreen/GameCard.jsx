import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './GameCard.module.css';
import {CardActions, CardContent, CardMedia} from "@material-ui/core";
import {postAnswer} from "../../redux/gameReducer";

const useStyles = makeStyles({
    root: {
        maxWidth: 100,
        border: 1,
        margin: 5,

    },
});

let sendAns = (props, ans) => {
    let action = postAnswer(props.props.gamePage.game.rounds.question.id, ans);
    props.props.dispatch(action);
}

function GetCardAnswers(props, name, ansVariants) {

    let a = props.ansVariants.map(el =>
        <Button size="small" color="primary" onClick={() => {
            sendAns(props, el);
        }}>
            {el}
        </Button>
    )
    return (<CardActions>{a}</CardActions>);
}

function showImage(image) {
    let a = <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={image}
        title="image"/>
    return image != null ? a : null;
}

export default function GameCard(props) {
    const defClasses = useStyles();
    return (
        <Card className={defClasses.root + classes.gameCard}>
            {props.question != null &&
            <CardContent>
                <Typography className={classes.topic} variant="h4" component="h2">
                    {props.question.topic}
                </Typography>
                <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                    {props.question.question}
                </Typography>
                <GetCardAnswers className={classes.answer} props={props.props} name={props.props.name}
                                ansVariants={props.question.ansVariants}/>
            </CardContent>
            }
            {props.question == null &&
            <Typography className={classes.topic} variant="h4" color="textSecondary" component="p">
                WAIT FOR A START
            </Typography>}
        </Card>
    );
}