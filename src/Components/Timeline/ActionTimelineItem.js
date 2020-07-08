import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TimelineItem, TimelineOppositeContent,
    TimelineSeparator, TimelineContent, TimelineConnector } from '@material-ui/lab'
import { Paper, Typography, Box, Avatar } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event';
import { blue } from '@material-ui/core/colors';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
    action: {
        margin: "1rem",
        padding: "0.5rem",
        minWidth: "250px"
    },
  }));
  
export default function TimelineItemLeft(props) {
    const classes = useStyles();
    const due_date = moment(props.due_date).format("DD MMM YYYY, hh:mm a")
    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Box>
                    <Typography variant="body2" color="textSecondary">
                        {due_date}
                    </Typography>
                </Box>
            </TimelineOppositeContent>
            <TimelineSeparator>
                    <Avatar className={classes.blue}><EventIcon/></Avatar>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3}>
                    <Box className={classes.action}>
                        <Typography variant="h6" component="h1">{props.event}</Typography>
                        <Typography>{props.note}</Typography>
                    </Box>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}
