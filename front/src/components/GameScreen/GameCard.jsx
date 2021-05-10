import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './GameCard.module.css';
import {CardActions, CardContent, CardMedia} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 100,
        border: 1,
        margin: 5,

    },
});

function GetCardAnswers(ansVariants){
    let a = ansVariants.ansVariants.map(el =>
        <Button size="small" color="primary">
            {el}
        </Button>
    )
    return(<CardActions>{a}</CardActions>);
}

function showImage(image){
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
            <CardContent>
                    <Typography className={classes.topic} variant="h4" component="h2">
                        {props.question[0].topic}
                    </Typography>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        {props.question[0].question}
                    </Typography>
                <GetCardAnswers className = {classes.answer} ansVariants = {props.question[0].ansVariants}/>
            </CardContent>
        </Card>
    );
}