import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent, Box, CardHeader, Avatar} from '@material-ui/core'
import moment from 'moment';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    avatar: {
        backgroundColor: red[500]
    }
}))

export default function ContactCard(props) {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
                avatar={
                <Avatar aria-label="contact" className={classes.avatar}>
                    C
                </Avatar>
                }
                title={props.name}
                subheader={props.function}
            />
            <CardContent>
                <Typography variant="h6" component="p">
                    <strong>Email: </strong>{props.email}
                </Typography>
                <Typography variant="h6" component="p">
                    <strong>Telefoon: </strong> {props.phone}
                </Typography>
                <Typography textAlign='right' variant="captiontext">
                    <em>Gecreëerd:</em> {moment(props.createdAt).format("DD MMM YYYY")
                }</Typography>
            </CardContent>
        </Card>
    )
}
