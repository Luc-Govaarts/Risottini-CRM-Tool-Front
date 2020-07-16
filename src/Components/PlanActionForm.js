import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { createAction } from '../store/appFeed/actions'

export default function PlanActionForm(props) {
    const [action, set_action] = useState('')
    const [date, set_date] = useState(new Date())
    const [time, set_time] = useState(new Date())
    const [note, set_note] = useState('')
    const leadId = props.leadId
    const dispatch= useDispatch()

    const due_date = `${moment(date).format('YYYY-MM-DD')} ${ moment(time).format('HH:mm:ss')}`

    const submitHandler = (event) => {
        event.preventDefault()
        
        dispatch(createAction(
            leadId,
            action,
            due_date,
            note
        ))

        set_action('')
        set_date(new Date())
        set_time(new Date())
        set_note('')
    }

    return (
            <Card>
                
                <Box m={3}>
                    <CardHeader title="Plan een actie"/>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                        <TextField
                            onChange={e => {set_action(e.target.value)}}
                            value={action}
                            variant="outlined"
                            margin="normal"
                            id="action"
                            required
                            fullWidth
                            autoFocus/>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Datum"
                                value={date}
                                onChange={date => set_date(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Tijd"
                                value={time}
                                onChange={time => set_time(time)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            onChange={e => {set_note(e.target.value)}}
                            value={note}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="note"
                            label="Notitie"
                            autoFocus/>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                            Bewaren
                        </Button>
                        </form>
                    </CardContent>
                </Box>
            </Card>
    )
}