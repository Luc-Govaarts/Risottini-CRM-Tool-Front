import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adjustAction } from '../../store/appFeed/actions'
import { selectUserById } from '../../store/appFeed/selectors'
import { makeStyles } from '@material-ui/core/styles';
import { selectUser } from '../../store/user/selectors'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker  } from '@material-ui/pickers';
import { TimelineItem, TimelineOppositeContent,
    TimelineSeparator, TimelineContent, TimelineConnector } from '@material-ui/lab'
    import { Paper, Typography, Box, Avatar, Link,
        Button, TextField, Dialog,
        DialogActions, DialogContent, 
        DialogContentText, DialogTitle } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event';
import { blue } from '@material-ui/core/colors';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

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
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [adjusted_action, set_adjusted_action] = useState("")
    const [adjusted_date, set_adjusted_date] = useState(new Date())
    const [adjusted_time, set_adjusted_time] = useState(new Date())
    const [adjusted_note, set_adjusted_note] = useState('')
    const adjusted_due_date = `${moment(adjusted_date).format('YYYY-MM-DD')} ${ moment(adjusted_time).format('HH:mm:ss')}`
    const due_date = moment(props.due_date).format("DD MMM YYYY, hh:mm a")
    const dateUpdated = moment(props.dateUpdated).format("DD MMM YYYY, hh:mm a")
    const dateCreated = moment(props.dateCreated).format("DD MMM YYYY, hh:mm a")
    const author = useSelector(selectUserById(props.userId))
    const name = author.name
    const user = useSelector(selectUser)
    const userId = user.id
    const actionId = props.id
    const leadId = props.leadId

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };  

    const handleAdjust = () => {
        dispatch(adjustAction(
            actionId,
            adjusted_action,
            adjusted_due_date,
            adjusted_note,
            userId,
            leadId))

        set_adjusted_action("")
        set_adjusted_date(new Date())
        set_adjusted_time(new Date())    
        set_adjusted_note("")
        handleClose()
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
                                value={adjusted_action}
                                onChange={e => {set_adjusted_action(e.target.value)}}
                                margin="dense"
                                label="Actie"
                                type="text"
                                fullWidth
                                />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="YYYY-MM-DD"
                                    margin="normal"
                                    label="Datum"
                                    value={adjusted_date}
                                    onChange={date => set_adjusted_date(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin="normal"
                                    label="Tijd"
                                    value={adjusted_time}
                                    onChange={time => set_adjusted_time(time)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                onChange={e => {set_adjusted_note(e.target.value)}}
                                value={adjusted_note}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Notitie"
                                autoFocus/>
                        </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    onClick={handleAdjust}
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
                            {due_date}
                        </Typography>
                        <Link variant="caption" component="button" onClick={handleClickOpen}>Aanpassen</Link>
                    </Box>
                </TimelineOppositeContent>
                <TimelineSeparator>
                        <Avatar className={classes.blue}><EventIcon/></Avatar>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3}>
                        <Box className={classes.action}>
                            <Typography variant="h6">{props.event}</Typography>
                            <Typography>{props.note}</Typography>
                            <Typography variant="caption"><em>Door:</em> {name}</Typography>
                            <Box>
                                {dateUpdated !== dateCreated? 
                                <Typography variant="caption" color="textSecondary">{"Aangepast op: "}
                                {dateUpdated}</Typography> : null}
                            </Box>
                        </Box>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        )
    }
}
