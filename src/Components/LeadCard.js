import React, { useState }from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../store/appFeed/selectors'
import { Paper, Typography, Box, Avatar, Link,
    Button, TextField, Dialog, Card, CardContent, 
    DialogActions, DialogContent, 
    DialogContentText, DialogTitle } from '@material-ui/core'
import moment from 'moment';

export default function LeadCard(props) {
    const user = useSelector(selectUserById(props.userId))
    const name = user.name
    const [open_adjust, set_adjust_open] = useState(false);
    const [open_delete, set_delete_open] = useState(false);

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

    const adjustLead = () => {
        console.log("******")
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
        {open_adjust ? <div>
                <Dialog open={open_adjust} onClose={handleCloseAdjust}>
                    <DialogTitle>Lead gegevens aanpassen</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Pas je gegevens aan en klik op bevestigen
                            </DialogContentText>
                                {/* <TextField
                                autoFocus
                                value={adjusted_note}
                                onChange={e => {set_adjusted_note(e.target.value)}}
                                margin="dense"
                                label="Notitie"
                                type="text"
                                fullWidth
                                /> */}
                        </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAdjust} color="primary">
                                Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={adjustLead}
                                >
                                Bevestigen 
                                </Button>
                            </DialogActions>
                </Dialog>
            </div> : null}
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
