import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Link } from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		margin: theme.spacing(2),
	},
}))

export default function LeadAutoComplete(props) {
	const classes = useStyles()
	const report = props.report

	return (
		<Link href={`/leads/${report.lead.id}`}>
			<Grid container alignItems='center'>
				<Grid item>
					<CommentIcon className={classes.icon} />
				</Grid>
				<Grid item xs>
					<Typography variant='body1' color='textPrimary'>
						{report.lead.company_n}
						{report.user.name}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						{`${report.note.substring(0, 25)}...`}
					</Typography>
				</Grid>
			</Grid>
		</Link>
	)
}
