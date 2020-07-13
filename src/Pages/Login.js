import React, { useState, useEffect }from 'react';
import { login } from "../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { useHistory } from "react-router-dom";
import { Button, Container, Avatar,
  TextField, Link, Typography, Box } from '@material-ui/core';
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

export default function Login() {
  const classes = useStyles();
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")    
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  
  useEffect(() => {
      if (token !== null) {
        history.push("/");
      }
    }, [token, history]);
  
  function submitForm(event) {
      event.preventDefault();
  
      dispatch(login(email, password));
  
      set_email("");
      set_password("");
    }
  
  return (
    <Box mt={12}>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Log in
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
  );
}