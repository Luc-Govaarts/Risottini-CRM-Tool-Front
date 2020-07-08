import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, Button, TextField} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createAction } from '../store/appFeed/actions'

export default function PlanActionForm(props) {
    const [action, set_action] = useState('')
    const [date, set_date] = useState()
    const [note, set_note] = useState('')
    const leadId = props.leadId
    const dispatch= useDispatch()

    const submitHandler = () => {
        dispatch(createAction(
            leadId,
            action,
            date,
            note
        ))

        set_action('')
        set_date(new Date())
        set_note('')
    }
    
    return (
            <Card style={{ minWidth: "500px"}}>
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
                        <TextField
                            onChange={e => {set_date(e.target.value)}}
                            value={date}
                            id="datetime-local"
                            label="volgende Afspraak"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                            shrink: true,
                            }}/>
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
            </Card>
    )
}
