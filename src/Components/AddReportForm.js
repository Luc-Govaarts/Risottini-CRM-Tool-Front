import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, CardHeader, TextField, Button, Card, Box } from '@material-ui/core'

export default function AddReportForm() {
    const [note, set_note] = useState("")
    const dispatch = useDispatch()

    const submitHandler = () => {
        // dispatch(postNewReport)

        set_note("")
    } 

    return (
        <Container component="main" maxWidth="xs">
            <Card >
                <Box m={3}>
                    <CardHeader title="Maak een notitie"/>
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
                            fullWidth
                            variant="contained"
                            color="primary">
                            Bewaren
                        </Button>
                    </form>
                </Box>
            </Card>
        </Container>
    )
}
