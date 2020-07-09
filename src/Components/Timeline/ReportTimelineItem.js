import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/appFeed/selectors'
import { makeStyles } from '@material-ui/core/styles';
import { TimelineItem, TimelineOppositeContent,
    TimelineSeparator, TimelineContent, TimelineConnector } from '@material-ui/lab'
import { Paper, Typography, Box, Avatar} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment';
import { deepOrange } from '@material-ui/core/colors';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    note: {
        margin: "1rem",
        padding: "0.5rem",
        minWidth: "250px"
    },

  }));
  
export default function TimelineItemLeft(props) {
    const classes = useStyles();
    const date = moment(props.date).format("DD MMM YYYY, hh:mm a")
    const user = useSelector(selectUser(props.userId))
    const name = user.name
    return (
    <TimelineItem>
        <TimelineOppositeContent>
            <Box>
                <Typography variant="body2" color="textSecondary">
                    {date}
                </Typography>
            </Box>
        </TimelineOppositeContent>
        <TimelineSeparator>
                <Avatar className={classes.orange}><CommentIcon/></Avatar>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Paper elevation={3}>
                <Box className={classes.note}>
                    <Typography variant="h6" >{name}</Typography>
                    <Typography>{props.note}</Typography>
                </Box>
            </Paper>
        </TimelineContent>
    </TimelineItem>
    )
}
