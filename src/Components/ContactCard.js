import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Typography,
	Avatar,
	Card,
	CardHeader,
	CardContent,
} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function ContactCard(props) {
	const classes = useStyles()
	const contact = props.contact
	const dateUpdated = moment(contact.updatedAt).format('DD MMM YYYY, hh:mm a')
	const dateCreated = moment(contact.createdAt).format('DD MMM YYYY, hh:mm a')
	
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						{contact.name.charAt(0)}
					</Avatar>
				}
				title={contact.name}
			/>
			<CardContent>
				<Typography>
					<strong>Functie: </strong> {contact.job_title}
				</Typography>
				<Typography>
					<strong>Email: </strong>
					{contact.email}
				</Typography>
				<Typography>
					<strong>Telefoon: </strong> {contact.phone}
				</Typography>
				{dateUpdated !== dateCreated ? (
					<Typography variant='caption' color='textSecondary'>
						{'Aangepast op: '}
						{dateUpdated}
					</Typography>
				) : null}
			</CardContent>
		</Card>
	)
}
