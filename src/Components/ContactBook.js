import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Paper,
	Grid,
	Typography,
	List,
} from '@material-ui/core'
import ContactListItem from './ContactListItem'

const useStyles = makeStyles((theme) => ({

}))

export default function ContactBook(props) {
	const classes = useStyles()
	const contacts = props.contacts

	return (
		<Grid container direction='row' justify='flex-start'>
			<Grid item xs={6}>
				<Paper>
					<List className={classes.contactList}>
						{contacts.map((contact) => {
							return (
								<ContactListItem contact={contact}/>
							)
						})}
					</List>
				</Paper>
			</Grid>
		</Grid>
	)
}
