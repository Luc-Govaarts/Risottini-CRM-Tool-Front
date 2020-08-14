import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box, IconButton} from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkOutlineOutlined';
import ContactPhoneIcon from '@material-ui/icons/ContactPhoneOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const useStyles = makeStyles((theme) => ({
  Toolbar: {
    width: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    margin: theme.spacing('auto', 1),
    color: theme.palette.secondary
  }
  }));

export default function MyAppBar(props) {
    const classes = useStyles();
    const token = useSelector(selectToken);
    const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

    return (
      <AppBar>
        <Toolbar className={classes.Toolbar}>
          {loginLogoutControls}
          <Box>
            <IconButton href="/"> 
              <WorkIcon className={classes.icon}></WorkIcon>
            </IconButton>
            <IconButton href="/actions">
              <EventIcon className={classes.icon}></EventIcon>
            </IconButton>
            <IconButton href="/contacts">
              <ContactPhoneIcon className={classes.icon}></ContactPhoneIcon>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    )
}