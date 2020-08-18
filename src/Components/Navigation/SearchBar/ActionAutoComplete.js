import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Link } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event'

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		margin: theme.spacing(2),
	},
}))

export default function ActionAutoComplete(props) {
	const classes = useStyles()
	const action = props.action

	return (
		<Link href={`/leads/${action.lead.id}`}>
			<Grid container alignItems='center'>
				<Grid item>
					<EventIcon className={classes.icon} />
				</Grid>
				<Grid item xs>
					<Typography variant='body1' color='textPrimary'>
						{action.lead.company_name}
					</Typography>
					{action.lead.associated_company_name ? (
						<Typography variant='body2' color='textSecondary'>
							{action.lead.associated_company_name}
						</Typography>
					) : null}
					<Typography variant='body2' color='textSecondary'>
						{action.action}
					</Typography>
				</Grid>
			</Grid>
		</Link>
	)
}
