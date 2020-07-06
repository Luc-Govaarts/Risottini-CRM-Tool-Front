import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from './MyAppBar'
import MyDrawer from './MyDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}))

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar open={open} handler={handleDrawerOpen}/>
      <MyDrawer open={open} close={handleDrawerClose}/>
    </div>
  );
}