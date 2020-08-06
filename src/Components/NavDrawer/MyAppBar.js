import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkOutlineOutlined';
import ContactPhoneIcon from '@material-ui/icons/ContactPhoneOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const useStyles = makeStyles((theme) => ({
  Toolbar: {
    display: 'flex',
    width: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'flex-start'
  },
  icon: {
    fontSize: 30,
    margin: theme.spacing('auto', 15)
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
            <WorkIcon className={classes.icon}>

            </WorkIcon>
            
            <EventIcon className={classes.icon}>

            </EventIcon>
            <ContactPhoneIcon className={classes.icon}>

            </ContactPhoneIcon>
            {/* <Box>
              <Typography variant="h5">Crispy</Typography>
            </Box> */}
          </Box>
        </Toolbar>
      </AppBar>
    )
}
