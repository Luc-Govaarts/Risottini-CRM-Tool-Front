import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateContact, fetchContacts } from '../store/appFeed/actions'
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
} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function LeadContactCard(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const dateUpdated = moment(props.updatedAt).format('DD MMM YYYY, hh:mm a')
	const dateCreated = moment(props.createdAt).format('DD MMM YYYY, hh:mm a')
	const [open_adjust, set_adjust_open] = useState(false)
	const [open_delete, set_delete_open] = useState(false)
	const contacts = useSelector(selectContacts)
	const [contactId, set_contactId] = useState(1)
	const leadId = props.leadId

	useEffect(() => {
		if (!contacts[0]) {
			dispatch(fetchContacts)
		}
	}, [contacts])

	const handleOpenAdjust = () => {
		set_adjust_open(true)
	}

	const handleCloseAdjust = () => {
		set_adjust_open(false)
	}

	const handleOpenDelete = () => {
		set_delete_open(true)
	}

	const handleCloseDelete = () => {
		set_delete_open(false)
	}

	const handleAdjustContact = (event) => {
		event.preventDefault()

		dispatch(updateContact(contactId, leadId))

		set_contactId(1)
	}

	const handleDeleteContact = (event) => {
		event.preventDefault()

		dispatch(updateContact(null, leadId))
	}

	return (
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
				{dateUpdated !== dateCreated ? (
					<Typography variant='caption' color='textSecondary'>
						{'Aangepast op: '}
						{dateUpdated}
					</Typography>
				) : null}
			</CardContent>
			<CardActions>
				<Button onClick={handleOpenAdjust} color='primary' size='small'>
					Aanpassen
				</Button>
				<Button onClick={handleOpenDelete} color='default'>
					Verwijderen
				</Button>
			</CardActions>
			{open_adjust ? (
				<div>
					<Dialog open={open_adjust} onClose={handleCloseAdjust}>
						<DialogTitle>Contact aanpassen</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Selecteer een ander contact persoon
							</DialogContentText>
							<form>
								<FormControl>
									<Select
										value={contactId}
										onChange={(event) => set_contactId(event.target.value)}
										variant='outlined'
										fullWidth
										label='Contact persoon'>
										{contacts.map((contact) => {
											return (
												<MenuItem key={contact.id} value={contact.id}>
													{contact.name}
												</MenuItem>
											)
										})}
									</Select>
								</FormControl>
							</form>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseAdjust} color='primary'>
								Cancel
							</Button>
							<Button
								type='submit'
								color='primary'
								onClick={handleAdjustContact}>
								Bevestigen
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			) : null}
			{open_delete ? (
				<div>
					<Dialog open={open_delete} onClose={handleCloseDelete}>
						<DialogTitle>Contact Verwijderen</DialogTitle>
						<DialogContent>
							De relatie met dit contact persoon verwijderen
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDelete} color='primary'>
								Cancel
							</Button>
							<Button color='primary' onClick={handleDeleteContact}>
								Bevestigen
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			) : null}
		</Card>
	)
}
