import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateContact } from '../store/appFeed/actions'
import { selectContacts } from '../store/appFeed/selectors'
import { makeStyles } from '@material-ui/core/styles';
import { fetchContacts } from '../store/appFeed/actions';
import { Box, CardHeader, CardContent, Card, Button, Select, MenuItem, FormControl } from'@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        width: '100%',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function ConnectContactCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const contacts = useSelector(selectContacts)
    const [contactId, set_contactId] = useState(1)
    const leadId = props.leadId

    useEffect(() => {
        if(!contacts[0]) {
            dispatch(fetchContacts)
        }
    }, [contacts])


    const submitNewContact = (event) => {
        event.preventDefault()

        dispatch(updateContact(contactId, leadId))

        set_contactId(null)
    }

    return (
        <div>
            <Box mt={3}>
                <Card>
                    <Box m={3}>
                        <CardHeader title="Selecteer een contact"/>
                        <CardContent>
                            <form className={classes.form} onSubmit={submitNewContact} noValidate>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={contactId}
                                        onChange={event => set_contactId(event.target.value)}                                         
                                        variant="outlined" 
                                        label="Contact persoon"
                                    >
                                    {contacts.map(contact => {
                                        return <MenuItem key={contact.id} value={contact.id}
                                            >{contact.name}</MenuItem> 
                                        })
                                    }
                                    </Select>
                                </FormControl>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >Voeg geselecteerd contact toe
                                </Button>
                                <Box m={1}>
                                </Box>
                                <Button
                                    fullWidth
                                    href="/contacts/add"
                                    name="addNewContact"
                                    variant="contained"
                                    color="primary"
                                >Voeg nieuw contact toe
                                </Button>
                            </form>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        </div>
    )
}
