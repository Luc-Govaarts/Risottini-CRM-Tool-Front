import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedContactId } from '../store/ContactBook/selectors'
import { makeStyles } from '@material-ui/core/styles'
import {
	Box,
	Card,
	Grid,
	List,
	Avatar,
	CardHeader,
	CardContent,
	Divider,
	TextField,
} from '@material-ui/core'
import ContactListItem from './ContactListItem'
import ContactCard from './ContactCard'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '400px',
	},
	contactList: {
		maxHeight: '400px',
		overflow: 'auto',
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
	searchField: {
		width: '300px',
		marginRight: theme.spacing(3),
	},
}))

export default function ContactBook(props) {
	const classes = useStyles()
	const contacts = props.contacts
	const selectedContactId = useSelector(selectSelectedContactId)
	const selectedContact = contacts.find(
		(contact) => contact.id === selectedContactId
	)
	const [search_input, set_search_input] = useState('')

	const filterContacts = (contacts, condition) => {
		return contacts.filter((contact) => {
			const leadNameArray = contact.leads.map(lead => lead.company_name)
			if(contact.leads[0]){
				return (
					contact.name.includes(condition) ||
					contact.job_title.includes(condition) ||
					leadNameArray.join('').includes(condition)
				)
			} else {
				return (
					contact.name.includes(condition) ||
					contact.job_title.includes(condition) 
				)
			}
		})
	}

	const filteredContacts = filterContacts(contacts, search_input)

	return (
		<Card>
			<CardHeader
				title='Contacten'
				avatar={
					<Avatar className={classes.avatar}>
						<ContactPhoneIcon />
					</Avatar>
				}
				action={
					<TextField
						value={search_input}
						onChange={(event) => {
							set_search_input(event.target.value)
						}}
						size='small'
						margin='dense'
						variant='outlined'
						label='Zoek op naam, functie of lead'
						className={classes.searchField}
					/>
				}></CardHeader>
			<CardContent>
				<Divider />
				<Box className={classes.root}>
					<Grid container direction='row' justify='flex-start'>
						<Grid item xs={5}>
							<List className={classes.contactList}>
								{filteredContacts.map((contact) => {
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
						<Grid item xs={7}>
							{selectedContact ? (
								<ContactCard contact={selectedContact} />
							) : null}
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	)
}
