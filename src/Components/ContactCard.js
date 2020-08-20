import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { adjustContactDetails, deleteContact } from '../store/appFeed/actions'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import {
	Link,
	Paper,
	Typography,
	Avatar,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
	paper: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function ContactCard(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const contact = props.contact
	const dateUpdated = moment(contact.updatedAt).format('DD MMM YYYY, hh:mm a')
	const dateCreated = moment(contact.createdAt).format('DD MMM YYYY, hh:mm a')
	const [open_adjust, set_adjust_open] = useState(false)
	const [open_delete, set_delete_open] = useState(false)
	const [contact_name, set_contact_name] = useState('')
	const [contact_email, set_contact_email] = useState('')
	const [contact_phone, set_contact_phone] = useState('')
	const [job_title, set_job_title] = useState('')

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

	const handleAdjustContact = () => {
		dispatch(adjustContactDetails(
			contact.id,
			contact_name,
			contact_email,
			contact_phone,
			job_title
		))
	}

	const handleDeleteContact = () => {
		dispatch(deleteContact(contact.id))
		handleCloseDelete()
	}

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>{contact.name.charAt(0)}</Avatar>
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
				<Typography>
					<strong> Lead(s): </strong>{' '}
				</Typography>
				{contact.leads.map((lead) => {
					return (
						<Typography key={lead.id}>
							<Link href={`leads/${lead.id}`} variant='body2'>
								{lead.company_name}
							</Link>
						</Typography>
					)
				})}
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
				<Dialog open={open_adjust} onClose={handleCloseAdjust}>
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<ContactPhoneIcon />
						</Avatar>
						<DialogTitle>Contact aanpassen</DialogTitle>
						<DialogContent>Pas de contact gegevens aan</DialogContent>
						<form
							className={classes.form}
							onSubmit={handleAdjustContact}
							noValidate>
							<TextField
								onChange={(event) => set_contact_name(event.target.value)}
								value={contact_name}
								defaultValue={contact.name}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='contact_name'
								label='Naam'
								name='contact_name'
								autoFocus
							/>
							<TextField
								onChange={(event) => set_job_title(event.target.value)}
								value={job_title}
								defaultValue={contact.job_title}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='job_title'
								label='Functie'
								name='job_title'
								autoFocus
							/>
							<TextField
								onChange={(event) => set_contact_email(event.target.value)}
								value={contact_email}
								defaultValue={contact.email}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='contact_email'
								label='Email'
								name='contact_email'
								autoFocus
							/>
							<TextField
								onChange={(event) => set_contact_phone(event.target.value)}
								value={contact_phone}
								defaultValue={contact.phone}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='contact_phone'
								label='Telefoon'
								name='contact_phone'
								autoFocus
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}>
								Wijzig contact gegevens
							</Button>
						</form>
						<DialogActions>
							<Button onClick={handleCloseAdjust} color='primary'>
								Cancel
							</Button>
						</DialogActions>
					</Paper>
				</Dialog>
			) : null}
			{open_delete ? (
				<div>
					<Dialog open={open_delete} onClose={handleCloseDelete}>
						<DialogTitle>Contact Verwijderen</DialogTitle>
						<DialogContent>Dit contact persoon verwijderen</DialogContent>
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
