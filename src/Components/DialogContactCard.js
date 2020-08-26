import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectContacts } from '../store/appFeed/selectors'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import { makeStyles } from '@material-ui/core/styles'
import {
	Typography,
	Avatar,
	Button,
	FormControl,
	CardActions,
	Dialog,
	Card,
	CardHeader,
	CardContent,
	DialogActions,
	Select,
	DialogContent,
	DialogTitle,
	DialogContentText,
	MenuItem,
	Link,
} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function DialogContactCard(props) {
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
		<Dialog open={open} onClose={handleClose}>
			<Card>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							<ContactPhoneIcon />
						</Avatar>
					}
					title={props.name}
				/>
				<CardContent>
					<Typography>
						<strong>Functie: </strong> {props.job_title}
					</Typography>
					<Typography>
						<strong>Email: </strong>
						{props.email}
					</Typography>
					<Typography>
						<strong>Telefoon: </strong> {props.phone}
					</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={handleOpenAdjust} color='primary' size='small'>
						Aanpassen
					</Button>
					<Button onClick={handleOpenDelete} color='default'>
						Verwijderen
					</Button>
				</CardActions>
			</Card>
		</Dialog>
	)
}
