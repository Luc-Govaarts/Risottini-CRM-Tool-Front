import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function ContactListItem(props) {
	const classes = useStyles()
	const contact = props.contact

	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar className={classes.avatar}>
					<ContactPhoneIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={contact.name} secondary={contact.job_title} />
		</ListItem>
	)
}
