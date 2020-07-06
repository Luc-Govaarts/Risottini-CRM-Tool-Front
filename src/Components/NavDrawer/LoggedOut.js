import React from "react";
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function LoggedOut() {
    const history = useHistory();
    return (
        <Button variant="contained"
                onClick={() => {history.push("/login")}}>Log In</Button>
    );
    }
