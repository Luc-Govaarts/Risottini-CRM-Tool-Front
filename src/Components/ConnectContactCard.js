import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateContact, addContact, fetchContacts } from '../store/appFeed/actions'
import { selectContacts } from '../store/appFeed/selectors'
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardHeader, CardContent, Card, Button, 
    Select, MenuItem, FormControl, TextField, DialogActions, 
    Dialog, DialogTitle, DialogContent, DialogContentText } from'@material-ui/core'

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
    const [open, set_open] = useState(false)
    const [contactId, set_contactId] = useState(1)
    const [contact_name, set_contact_name] = useState("")
    const [contact_email, set_contact_email] = useState("")
    const [contact_phone, set_contact_phone] = useState("")
    const [job_title, set_job_title] = useState("")
    const leadId = props.leadId

    useEffect(() => {
        if(!contacts[0]) {
            dispatch(fetchContacts)
        }
    }, [contacts])

    const handleOpen = () => {
        set_open(true);
    };
  
    const handleClose = () => {
        set_open(false);
    };


    const submitNewContact = (event) => {
        event.preventDefault()

        dispatch(updateContact(contactId, leadId))

        set_contactId(1)
    }

    const submitContactForm = (event) => {
        event.preventDefault()  
    
        dispatch(addContact(
            contact_name,
            contact_email,
            contact_phone,
            job_title))
        
        set_contact_name("")
        set_contact_email("")
        set_contact_phone("")
        set_job_title("")     
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
                                    variant="outlined"
                                    color="primary"
                                >Voeg geselecteerd contact toe
                                </Button>
                                <Box m={1}>
                                </Box>
                                <Button
                                    fullWidth
                                    onClick={handleOpen}
                                    name="addNewContact"
                                    variant="outlined"
                                    color="primary"
                                >Voeg nieuw contact toe
                                </Button>
                            </form>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
            {open ? <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Contact toevoegen</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Voeg een nieuw contact toe
                            </DialogContentText>
                            <form>
                                <TextField
                                    onChange={event => set_contact_name(event.target.value)}
                                    value={contact_name}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contact_name"
                                    label="Naam"
                                    name="contact_name"
                                    autoFocus
                                />
                                <TextField
                                    onChange={event => set_job_title(event.target.value)}
                                    value={job_title}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="job_title"
                                    label="Functie"
                                    name="job_title"
                                    autoFocus
                                />
                                <TextField
                                    onChange={event => set_contact_email(event.target.value)}
                                    value={contact_email}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contact_email"
                                    label="Email"
                                    name="contact_email"
                                    autoFocus
                                />
                                <TextField
                                    onChange={event => set_contact_phone(event.target.value)}
                                    value={contact_phone}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contact_phone"
                                    label="Telefoon"
                                    name="contact_phone"
                                    autoFocus
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={submitContactForm}
                            >
                            Bevestigen 
                            </Button>
                        </DialogActions>
                </Dialog>
            </div> : null}
        </div>
    )
}
