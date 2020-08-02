import React, { useState } from "react";
import { Button, Container, Avatar, 
    TextField, Typography, Box, 
    DialogContent, Dialog,
    DialogActions, DialogTitle} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { adjustLead } from "../store/appFeed/actions";
import  WorkIcon from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, 
    formControl: {
        marginBottom: theme.spacing(1),
        width: '100%',
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

export default function AdjustLeadDialog(props) {
    const classes = useStyles();
    const leadId = props.leadId
    const [company_name, set_company_name] = useState("")
    const [associated_company_name, set_associated_company_name] = useState("")
    const [company_phone, set_company_phone] = useState()
    const [company_address, set_company_address] = useState("")
    const [company_email, set_company_email] = useState("")
    const [supplier, set_supplier] = useState("")
    const dispatch = useDispatch();

    const adjustLeadForm = (event) => {
        event.preventDefault()    
        dispatch(adjustLead(
                leadId,
                company_name, 
                associated_company_name,
                company_phone, 
                company_address, 
                company_email, 
                supplier
            ))

        set_associated_company_name("")
        set_company_phone()
        set_company_address("")
        set_company_email("")
        set_supplier("")
    }
    
    return (
        <Dialog open={open_adjust} onClose={handleCloseAdjust}>
            <Box>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <WorkIcon/>
                        </Avatar>                       
                        <DialogTitle>
                            <Typography component="h1" variant="h5">
                            Pas lead info aan
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <form className={classes.form} onSubmit={adjustLeadForm}>
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
                                <DialogActions>
                                    <Button onClick={handleCloseAdjust} color="primary">
                                    Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                    Pas lead aan
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </div>
                </Container>
            </Box>
        </Dialog>
    )
}
