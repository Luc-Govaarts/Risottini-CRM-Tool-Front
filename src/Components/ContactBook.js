import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Paper,
	Grid,
	Typography,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'

const useStyles = makeStyles((theme) => ({
	contactList: {
		width: '350px',
		maxHeight: '500px',
		scrollable: true,
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
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
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<ContactPhoneIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={contact.name}
										secondary={contact.job_title}
									/>
								</ListItem>
							)
						})}
					</List>
				</Paper>
			</Grid>
		</Grid>
	)
}
