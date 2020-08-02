import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adjustReport, deleteReport } from '../../store/appFeed/actions'
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
    const [open_adjust, set_adjust_open] = useState(false);
    const [open_delete, set_delete_open] = useState(false);
    const dateCreated = moment(props.dateCreated).format("DD MMM YYYY, hh:mm a")
    const dateUpdated = moment(props.dateUpdated).format("DD MMM YYYY, hh:mm a")
    const author = useSelector(selectUserById(props.userId))
    const name = author.name
    const user = useSelector(selectUser)
    const leadId = props.leadId
    const userId = user.id
    const reportId = props.id
    const [adjusted_note, set_adjusted_note] = useState("")

    const handleOpenAdjust = () => {
        set_adjust_open(true);
    };
  
    const handleCloseAdjust = () => {
        set_adjust_open(false);
    };

    const handleOpenDelete = () => {
        set_delete_open(true);
    };
  
    const handleCloseDelete = () => {
        set_delete_open(false);
    };

    const adjustNote = () => {
        dispatch(adjustReport(
            reportId,
            adjusted_note,
            userId,
            leadId))

        set_adjusted_note("")
        handleCloseAdjust()
    }

    const handleDelete = () => {
        dispatch(deleteReport(reportId, leadId))
    }

    return (
            <TimelineItem>
                <TimelineOppositeContent>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {dateCreated}
                        </Typography>
                        <Link variant="caption" component="button" onClick={handleOpenAdjust}>Aanpassen</Link>{" || "}
                        <Link variant="caption" component="button" color="error" onClick={handleOpenDelete}>Verwijderen</Link>
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
                {open_adjust ? <div>
                    <Dialog open={open_adjust} onClose={handleCloseAdjust}>
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
                                <Button onClick={handleCloseAdjust} color="primary">
                                Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={adjustNote}
                                >
                                Bevestigen 
                                </Button>
                            </DialogActions>
                    </Dialog>
                </div> : null }
                {open_delete ? <div>
                    <Dialog open={open_delete} onClose={handleCloseDelete}>
                        <DialogTitle>Notitie Verwijderen</DialogTitle>
                        <DialogContent>
                            Weet je zeker dat je deze notitie wil verwijderen?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDelete} color="primary">
                            Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={handleDelete}
                            >
                            Bevestigen 
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div> : null }
            </TimelineItem>
    )
}
