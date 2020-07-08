import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage } from '../../store/appState/selectors'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { clearMessage } from '../../store/appState/actions';

export default function SnackBar() {
    const message = useSelector(selectMessage);
    const dispatch = useDispatch();
    const showMessage = message !== null;
    if (!showMessage) return null;
    
    return (
            <div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'}}
                    open={true}
                    autoHideDuration={3000}
                    message={message.text}
                    severity={message.variant}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" c
                                    color="inherit" onClick={message.dismissable ? () => dispatch(clearMessage()) : null}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>} 
                />  
            </div>
        )
    }
