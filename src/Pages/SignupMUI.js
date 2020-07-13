import React, { useState } from "react";
import { Box, Button, Container, Avatar,
    TextField, Link, Typography } from '@material-ui/core';
import { signUp } from "../store/user/actions";
import { useDispatch } from "react-redux";
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
                        <Button
                            onClick={submitForm}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log in
                        </Button>
                            <Link href="/signup" variant="body2">
                                {"Nog geen account? Schrijf je in"}
                            </Link>
                    </form>
                </div>
            </Container>
        </Box>
    )
}