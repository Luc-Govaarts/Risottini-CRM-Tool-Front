import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		margin: theme.spacing(2),
	},
}))

export default function ContactAutoComplete(props) {
	const classes = useStyles()
	const contact = props.contact
	const dateUpdated = moment(contact.updatedAt).format('DD MMM YYYY, hh:mm a')
	const dateCreated = moment(contact.createdAt).format('DD MMM YYYY, hh:mm a')
	const [open, set_open] = useState(true)
	const [open_adjust, set_open_adjust] = useState(false)
	const [open_delete, set_open_delete] = useState(false)

	const handleOpen = () => {
		set_open(true)
	}

	const handleClose = () => {
		set_open(false)
	}

	const handleOpenAdjust = () => {
		set_open_adjust(true)
	}

	const handleCloseAdjust = () => {
		set_open_adjust(false)
	}

	const handleOpenDelete = () => {
		set_open_delete(true)
	}

	const handleCloseDelete = () => {
		set_open_delete(false)
	}

	// const handleAdjustContact = () => {}

	// const handleDeleteContact = (event) => {
	// 	event.preventDefault()

	// 	dispatch(updateContact(null, leadId))
	// }

	return (
		<Grid container alignItems='center'>
			<Grid item>
				<ContactPhoneIcon className={classes.icon} />
			</Grid>
			<Grid item xs>
				<Typography variant='body1' color='textPrimary'>
					{contact.name}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					{contact.job_title}
				</Typography>
				<Button onClick={handleOpen} color='primary' size='small'>
					Meer
				</Button>
			</Grid>
		</Grid>
	)
}
