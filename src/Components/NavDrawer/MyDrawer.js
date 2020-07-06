import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box, Link,
  Drawer, ListItem,
  ListItemIcon, ListItemText,
  List, Divider, 
  IconButton} from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import WorkIcon from '@material-ui/icons/Work'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

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
                <ListItemText>Leads</ListItemText>
              </ListItem>
              <ListItemText>
                <Box ml={3}>
                <Link href={"/"}>
                  Alle Leads
                  </Link>
                </Box>
              </ListItemText>
              <ListItemText >
                <Box ml={3}>
                  <Link href={"/leads/add"}>
                  nieuwe Lead
                  </Link>
                </Box>
              </ListItemText>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon><ContactsIcon/></ListItemIcon>
                <ListItemText>Contacten</ListItemText>
              </ListItem>
              <ListItemText>
                <Box ml={3}>
                  <Link href={"/contacts"}>
                  Alle Contacten
                  </Link>
                </Box>
              </ListItemText>
              <ListItemText >
                <Box ml={3}>
                <Link href={"/contacts/add"}>
                  Nieuw Contact
                  </Link>
                </Box>
              </ListItemText>
            </List>
          </Drawer>
        </div>
    )
}
