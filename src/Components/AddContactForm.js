import React, { useState } from 'react'
import {
	Paper,
	Button,
	Avatar,
	TextField,
	Typography,
	Box,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { addContact } from '../store/appFeed/actions'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	paper: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function AddContactForm() {
    const classes = useStyles()
    const dispatch = useDispatch()
	const [contact_name, set_contact_name] = useState('')
	const [contact_email, set_contact_email] = useState('')
	const [contact_phone, set_contact_phone] = useState('')
	const [job_title, set_job_title] = useState('')

	const submitContactForm = (event) => {
		event.preventDefault()

		dispatch(addContact(contact_name, contact_email, contact_phone, job_title))

		set_contact_name('')
		set_contact_email('')
		set_contact_phone('')
		set_job_title('')
	}

	return (
		<Box>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<ContactPhoneIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Voeg nieuw contact toe
				</Typography>
				<form className={classes.form} onSubmit={submitContactForm} noValidate>
					<TextField
						onChange={(event) => set_contact_name(event.target.value)}
						value={contact_name}
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
						Voeg contact toe
					</Button>
				</form>
			</Paper>
		</Box>
	)
}
