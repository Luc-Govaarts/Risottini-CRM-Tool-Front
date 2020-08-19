import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSelectedContactId } from '../store/ContactBook/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, List } from '@material-ui/core'
import ContactListItem from './ContactListItem'
import ContactCard from './ContactCard'

const useStyles = makeStyles((theme) => ({
	contactList: {
		width: '350px',
		maxHeight: '500px',
		scrollable: true,
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
		<Paper>
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
		</Paper>
	)
}
