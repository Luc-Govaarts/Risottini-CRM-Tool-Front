import React, { useState, useEffect } from "react";
import { Button, Container, Avatar, FormControlLabel,
    TextField, Link, Typography, Box, Switch } from '@material-ui/core';
import { selectToken } from "../store/user/selectors";
import { selectContacts } from '../store/appFeed/selectors';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLead, fetchContacts } from "../store/appFeed/actions";
import { addContact } from '../store/appFeed/actions'
import SnackBar from "../Components/NavDrawer/SnackBar";
import WorkIcon from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function AddProspect() {
    const classes = useStyles();
    const [toggle_state, set_toggle_state] = useState({addContact: true,})
    const [contact_name, set_contact_name] = useState("")
    const [contact_email, set_contact_email] = useState("")
    const [contact_phone, set_contact_phone] = useState("")
    const [company_name, set_company_name] = useState("")
    const [associated_company_name, set_associated_company_name] = useState("")
    const [company_phone, set_company_phone] = useState()
    const [company_address, set_company_address] = useState("")
    const [company_email, set_company_email] = useState("")
    const [supplier, set_supplier] = useState("")
    const [contactId, set_contactId] = useState(1)
    const [contact_toggle, set_contact_toggle] = useState(false)
    const [job_title, set_job_title] = useState("")
    const [add_contact, set_add_contact] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();
    const contacts = useSelector(selectContacts)

    if (!token) {
      history.push("/");
    } 

    useEffect(() => {
        if (!contacts) {
        dispatch(fetchContacts)
        }
    }, );


    const submitLeadForm = (event) => {
        console.log("******")
        event.preventDefault()
        dispatch(addLead(
          company_name, 
          associated_company_name,
          company_phone, 
          company_address, 
          company_email, 
          supplier,
          contactId)) 

        set_associated_company_name("")
        set_company_phone()
        set_company_address("")
        set_company_email("")
        set_supplier("")
        set_contactId()
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
    }

    const handleContactToggle = (event) => {
        set_toggle_state({ ...toggle_state, [event.target.name]: event.target.checked });
    }

    console.log("COTAT TOGGLE STATE:", toggle_state)

    return (
        <Box mt={12}>
            <SnackBar/>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <WorkIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Voeg nieuwe lead toe 
                    </Typography>
                    <form className={classes.form} onSubmit={submitLeadForm} noValidate>
                        <TextField
                            onChange={event => set_company_name(event.target.value)}
                            value={company_name}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company_name"
                            label="Voer de bedrijfsnaam in"
                            name="company_name"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_associated_company_name(event.target.value)}
                            value={associated_company_name}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="associated_company_name"
                            label="Voeg partners toe. Bijvoorbeeld: Vermaat Groep"
                            name="associated_company_name"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_company_phone(event.target.value)}
                            value={company_phone}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company_phone"
                            label="Telefoon nummer"
                            name="company_phone"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_company_phone(event.target.value)}
                            value={company_phone}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company_phone"
                            label="Telefoon nummer"
                            name="company_phone"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_company_email(event.target.value)}
                            value={company_email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company_email"
                            label="Voeg email toe"
                            name="company_email"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_company_address(event.target.value)}
                            value={company_address}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="company_address"
                            label="Voeg address toe"
                            name="company_address"
                            autoFocus
                        />
                        <TextField
                            onChange={event => set_supplier(event.target.value)}
                            value={supplier}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="supplier"
                            label="Leverancier"
                            name="supplier"
                            autoFocus
                        />
                        <FormControlLabel
                            control={<Switch 
                                    checked={toggle_state.checkedA} 
                                    onChange={handleContactToggle} 
                                    name="addContact"
                                />}
                            label="Voeg contact toe"
                        />
                        {toggle_state.addContact ? "hallo" : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                        Voeg lead toe
                        </Button>
                        
                    </form>
                </div>
            </Container>
        </Box>
    )
}
