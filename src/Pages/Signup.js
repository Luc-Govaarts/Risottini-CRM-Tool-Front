import React, { useState } from "react";
import { selectToken } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Box, Button, Container, Avatar,
    TextField, Typography } from '@material-ui/core';
import { signUp } from "../store/user/actions";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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

export default function SignUp() {
    const classes = useStyles();
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [code, set_code] = useState("")
    const dispatch = useDispatch();

    const token = useSelector(selectToken)
    const history = useHistory();
  
    if(token) {
        history.push("/")
    }

    function submitForm(event) {
        event.preventDefault();
    
        dispatch(signUp(
            name, 
            email, 
            password,
            code
        ));
    
        set_email("");
        set_password("");
        set_name("");
        set_code("")
      }
    
    return (
        <Box mt={12}>
           <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Schrijf je in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={event => set_name(event.target.value)}
                            value={name}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Naam"
                            name="name"
                            autoComplete="Name"
                            autoFocus
                        />  
                        <TextField
                            onChange={event => set_email(event.target.value)}
                            value={email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            value={password}
                            onChange={event => set_password(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Wachtwoord"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            value={code}
                            onChange={event => set_code(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="code"
                            label="code"
                            type="password"
                            id="code"
                        />
                        <Button
                            onClick={submitForm}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Schrijf je in
                        </Button>
                            <Typography component="p" variant="caption">
                                Code alleen beschikbaar via Klein en Kok
                            </Typography>
                    </form>
                </div>
            </Container>
        </Box>
    )
}