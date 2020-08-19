import React from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedContactId } from '../store/ContactBook/selectors'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	Grid,
	List,
	Typography,
	Avatar,
	CardHeader,
	CardContent,
} from '@material-ui/core'
import ContactListItem from './ContactListItem'
import ContactCard from './ContactCard'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'

const useStyles = makeStyles((theme) => ({
	contactList: {
		width: '350px',
		maxHeight: '500px',
		scrollable: true,
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
}))

export default function ContactBook(props) {
	const classes = useStyles()
	const contacts = props.contacts
	const selectedContactId = useSelector(selectSelectedContactId)
	const selectedContact = contacts.find(
		(contact) => contact.id === selectedContactId
	)

	return (
		<Card>
			<CardHeader
				title='Contacten'
				avatar={
					<Avatar className={classes.avatar}>
						<ContactPhoneIcon />
					</Avatar>
				}></CardHeader>
			<CardContent>
				<Grid container direction='row' justify='flex-start'>
					<Grid item xs={6}>
						<List className={classes.contactList}>
							{contacts.map((contact) => {
								return (
									<ContactListItem
										key={contact.id}
										index={contact.id}
										contact={contact}
									/>
								)
							})}
						</List>
					</Grid>
					<Grid item xs={6}>
						{selectedContact ? <ContactCard contact={selectedContact} /> : null}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
