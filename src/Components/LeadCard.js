import React, { useState }from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../store/appFeed/selectors'
import { Typography, Container, Box, Avatar, Link,
    Button, TextField, Dialog, Card, CardContent, 
    DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import moment from 'moment';
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
  }));


export default function LeadCard(props) {
    const classes = useStyles();
    const user = useSelector(selectUserById(props.userId))
    const name = user.name
    const leadId = props.leadId
    const [open_adjust, set_adjust_open] = useState(false);
    const [open_delete, set_delete_open] = useState(false);
    const [company_name, set_company_name] = useState("")
    const [associated_company_name, set_associated_company_name] = useState("")
    const [company_phone, set_company_phone] = useState("")
    const [company_address, set_company_address] = useState("")
    const [company_email, set_company_email] = useState("")
    const [supplier, set_supplier] = useState("")
    const dispatch = useDispatch();

    const handleOpenAdjust = () => {
        set_adjust_open(true);
    };
  
    const handleCloseAdjust = () => {
        set_adjust_open(false);
    };

    const handleOpenDelete = () => {
        set_delete_open(true);
    };
  
    const handleCloseDelete = () => {
        set_delete_open(false);
    };

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

        set_company_name("")
        set_associated_company_name("")
        set_company_phone("")
        set_company_address("")
        set_company_email("")
        set_supplier("")
        handleCloseAdjust()
    }

    const handleDelete = () => {
        console.log("^^^^^^^6")
    }
    
    return (
    <div>
        <Card>
            <CardContent>
            <Typography variant="h6" 
                        component="p"><strong>Address: </strong>{props.address}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Telefoon: </strong> {props.phone}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Email: </strong>{props.email}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Leverancier: </strong>{props.supplier}</Typography>
            <Box textAlign='right'>
                <Typography variant="caption"><em>Gecreëerd:</em> {moment(props.createdAt).format("DD MMM YYYY")}</Typography>
            </Box>
            <Box textAlign='right'>
                <Typography variant="caption"><em>Door:</em> {name}</Typography>
            </Box>
            <Box textAlign="right">
                <Link variant="caption" component="button" onClick={handleOpenAdjust}>Aanpassen</Link>{" || "}
                <Link variant="caption" component="button" color="error" onClick={handleOpenDelete}>Verwijderen</Link>
            </Box>
            </CardContent>
        </Card>
        {open_adjust ? 
        <Dialog open={open_adjust} onClose={handleCloseAdjust}>
            <Box>
                <Container component="main">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <WorkIcon/>
                        </Avatar>                       
                            <Typography variant="h5">
                            Pas lead info aan
                            </Typography>
                        <DialogContent>
                            <DialogContentText>
                                Geen enkel veld is verplicht, vul alleen de velden in die je wilt aanpassen
                            </DialogContentText>
                            <form className={classes.form} onSubmit={adjustLeadForm}>
                                <TextField
                                    onChange={event => set_company_name(event.target.value)}
                                    value={company_name}
                                    variant="outlined"
                                    margin="normal"
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
                                        color="primary"
                                    >
                                    Pas lead aan
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </div>
                </Container>
            </Box>
        </Dialog> : null}
        {open_delete ? <div>
                <Dialog open={open_delete} onClose={handleCloseDelete}>
                    <DialogTitle>Lead Verwijderen</DialogTitle>
                    <DialogContent>
                        Weet je zeker dat je deze notitie wil verwijderen?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary">
                        Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleDelete}
                        >
                        Bevestigen 
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> : null}
    </div>
    )
}
