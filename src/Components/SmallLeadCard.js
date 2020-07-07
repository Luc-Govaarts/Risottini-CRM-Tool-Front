import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import LeadMenu from './LeadMenu'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardHeader 
        title={props.lead}
        subheader={props.partner}
        action={
          <IconButton aria-label="settings">
            <LeadMenu leadId={props.leadId}/>
          </IconButton>
        }/>
    </Card>
  );
}

