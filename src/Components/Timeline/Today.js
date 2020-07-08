import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TimelineItem, TimelineOppositeContent,
    TimelineSeparator, TimelineConnector, TimelineContent } from '@material-ui/lab'
import {Typography, Box, Avatar } from '@material-ui/core'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    green: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
    },
    date: {
        width: "200x"
    },
    content: {
        width: "200px"
    }
  }));
  
export default function TimelineItemLeft() {
    const classes = useStyles();
    
    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Box className={classes.date}>
                    <Typography variant="body2" color="textSecondary">
                        Nu
                    </Typography>
                </Box>
            </TimelineOppositeContent>
            <TimelineSeparator>
                    <Avatar className={classes.green}><EventAvailableOutlinedIcon/></Avatar>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.content}>

            </TimelineContent>
        </TimelineItem>
    )
}
