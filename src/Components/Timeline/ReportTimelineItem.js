import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adjustReport } from '../../store/appFeed/actions'
import { selectUserById  } from '../../store/appFeed/selectors'
import { selectUser } from '../../store/user/selectors'
import { makeStyles } from '@material-ui/core/styles';
import { TimelineItem, TimelineOppositeContent,
    TimelineSeparator, TimelineContent, TimelineConnector } from '@material-ui/lab'
import { Paper, Typography, Box, Avatar, Link,
        Button, TextField, Dialog,
        DialogActions, DialogContent, 
        DialogContentText, DialogTitle } from '@material-ui/core'
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
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const dateCreated = moment(props.dateCreated).format("DD MMM YYYY, hh:mm a")
    const dateUpdated = moment(props.dateUpdated).format("DD MMM YYYY, hh:mm a")
    const author = useSelector(selectUserById(props.userId))
    const name = author.name
    const user = useSelector(selectUser)
    const leadId = props.leadId
    const userId = user.id
    const reportId = props.id
    const [adjusted_note, set_adjusted_note] = useState("")

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const adjustNote = () => {
        dispatch(adjustReport(
            reportId,
            adjusted_note,
            userId,
            leadId))

        set_adjusted_note("")
        handleClose()
    }

    const handleDelete = () => {
        console.log("Delete button test")
    }
    
    if (open) {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Notitie aanpassen</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Pas je notitie aan en klik op bevestigen
                            </DialogContentText>
                                <TextField
                                autoFocus
                                value={adjusted_note}
                                onChange={e => {set_adjusted_note(e.target.value)}}
                                margin="dense"
                                label="Notitie"
                                type="text"
                                fullWidth
                                />
                        </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    onClick={adjustNote}
                                >
                                Bevestigen 
                                </Button>
                            </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Box>
                    <Typography variant="body2" color="textSecondary">
                        {dateCreated}
                    </Typography>
                    <Link variant="caption" component="button" onClick={handleClickOpen}>Aanpassen</Link>{" || "}
                    <Link variant="caption" component="button" color="error" onClick={handleDelete}>Verwijderen</Link>
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
                        {dateUpdated !== dateCreated? <Typography variant="caption" color="textSecondary">{"Aangepast op: "}
                        {dateUpdated}</Typography> : null}
                    </Box>
                </Paper>
            </TimelineContent>
        </TimelineItem>
        )
    }
}