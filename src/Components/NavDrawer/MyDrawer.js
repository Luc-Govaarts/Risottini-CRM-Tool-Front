import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box, Link,
  Drawer, ListItem,
  ListItemIcon, ListItemText,
  List, Divider, 
  IconButton,
  Typography} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  }));
  
export default function MyDrawer(props) {
    const classes = useStyles();
    const theme = useTheme()
    
    return (
        <div>
          <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={props.open}
              classes={{paper: classes.drawerPaper,}}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={props.close}>
                {theme.direction === 'rtl' 
                ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon><WorkIcon/></ListItemIcon>
                <ListItemText><Typography variant="h4">leads</Typography></ListItemText>
              </ListItem>
              <ListItemText>
                <Box ml={3}>
                  <Link href={"/"}>
                  <Typography variant="h5">Alle Leads</Typography>
                  </Link>
                </Box>
              </ListItemText>
              <ListItemText >
                <Box ml={3}>
                  <Link href={"/leads/add"}>
                    <Typography variant="h5">Nieuwe Lead********</Typography>
                  </Link>
                </Box>
              </ListItemText>
            </List>
            <Divider />
          </Drawer>
        </div>
    )
}
