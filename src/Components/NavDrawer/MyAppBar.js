import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
        marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
  }}));

export default function MyAppBar(props) {
    const classes = useStyles();
    const token = useSelector(selectToken);
    const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
           {loginLogoutControls}
          <Typography variant="h3" noWrap className={classes.title}>
          <Box textAlign="center" m={1}><strong>Crispy</strong></Box>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={props.handler}
            className={clsx(props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
}
