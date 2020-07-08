import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardHeader, CardContent, TextField, Button, Card, Box } from '@material-ui/core'
import { addNewReport } from '../store/appFeed/actions'

export default function AddReportForm(props) {
    const [note, set_note] = useState("")
    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(addNewReport(note, props.leadId))

        set_note("")
    } 

    return (
            <Card>
                <Box m={3}>
                    <CardHeader title="Maak een notitie"/>
                    <CardContent>
                        <form>
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
