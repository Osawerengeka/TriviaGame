import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './GameCard.module.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        border: 1,
        margin: 10,
    },
});

function GetCardAnswers(ansVariants){
    let a = ansVariants.ansVariants.map(el =>
        <Button size="small" color="primary">
            {el}
        </Button>
    )
    return(<div>{a}</div>);
}

export default function GameCard(props) {
    const defclasses = useStyles();
    return (
        <Card className={defclasses.root + classes.gameCard}>
            <div className={classes.gameCardGrid}>
            <CardActionArea>
                {/*<CardMedia*/}
                {/*    className={classes.image}*/}
                {/*    component="img"*/}
                {/*    alt="Contemplative Reptile"*/}
                {/*    height="140"*/}
                {/*    image={props.image != null ? props.image : null}*/}
                {/*    title="Contemplative Reptile"*/}
                {/*/>*/}
                    <Typography className={classes.topic} variant="h5" component="h2">
                        {props.question[0].topic}
                    </Typography>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        {props.question[0].question}
                    </Typography>
            </CardActionArea>
                <GetCardAnswers className={classes.answer} ansVariants ={props.question[0].ansVariants}/>
            </div>
        </Card>
    );
}