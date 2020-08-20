import React from 'react'
import { red, green, blue, orange } from '@material-ui/core/colors'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing(0, 2)
    },
    chipRed: {
        margin: theme.spacing(0, 2),
        backgroundColor: red[100],
    },
    chipGreen: {
        margin: theme.spacing(0, 2),
        backgroundColor: green[100],
    },
    chipBlue: {
        margin: theme.spacing(0, 2),
        backgroundColor: blue[100],
    },
    chipOrange: {
        margin: theme.spacing(0, 2),
        backgroundColor: orange[100],
    }
}))

export default function ActionColorLegend() {
    const classes = useStyles()
	return (
		<Box className={classes.root}>
			<Chip className={classes.chipGreen} label='Op tijd voltooide acties'/>
			<Chip className={classes.chipRed} label='Niet op tijd voltooide acties'/>
			<Chip className={classes.chipBlue} label='Nog te voltooien acties'/>
			<Chip className={classes.chipOrange} label='Voltooid, eerder dan gepland'/>
		</Box>
	)
}
