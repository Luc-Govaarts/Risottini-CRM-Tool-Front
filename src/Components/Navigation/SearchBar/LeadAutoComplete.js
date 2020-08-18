import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Link } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/Work'

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		margin: theme.spacing(2),
	},
}))

export default function LeadAutoComplete(props) {
	const classes = useStyles()
	const lead = props.lead

	return (
		<Link href={`/leads/${lead.id}`}>
			<Grid container alignItems='center'>
				<Grid item>
					<WorkIcon className={classes.icon} />
				</Grid>
				<Grid item xs>
					<Typography variant='body1' color='textPrimary'>
						{lead.company_name}
					</Typography>
					{lead.associated_company_name ? (
						<Typography variant='body2' color='textSecondary'>
							{lead.associated_company_name}
						</Typography>
					) : null}
					<Typography variant='body2' color='textSecondary'>
						{lead.company_address}
					</Typography>
				</Grid>
			</Grid>
		</Link>
	)
}
