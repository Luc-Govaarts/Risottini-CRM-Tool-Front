import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, Button, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useDispatch } from 'react-redux'
import { createAction } from '../store/appFeed/actions'

export default function PlanActionForm(props) {
    const [action, set_action] = useState('')
    const [date, set_date] = useState()
    const [time, set_time] = useState()
    const [note, set_note] = useState('')
    const leadId = props.leadId
    const dispatch= useDispatch()

    const submitHandler = () => {
        dispatch(createAction(
            leadId,
            action,
            date,
            time,
            note
        ))

        set_action('')
        set_date(new Date())
        set_note('')
    }
    
    return (
            <Card>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                <Box m={3}>
                    <CardHeader title="Plan een actie"/>
                    <CardContent>
                        <form>
                        <TextField
                            onChange={e => {set_action(e.target.value)}}
                            value={action}
                            variant="outlined"
                            margin="normal"
                            id="action"
                            required
                            fullWidth
                            autoFocus/>
                         <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={date}
                            onChange={e => set_date(e.target.action)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={time}
                            onChange={e => set_time(e.target.value)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
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
                            onClick={submitHandler}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Bewaren
                        </Button>
                        </form>
                    </CardContent>
                </Box>
                </MuiPickersUtilsProvider>
            </Card>
    )
}
