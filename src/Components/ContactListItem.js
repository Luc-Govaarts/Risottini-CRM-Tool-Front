import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedContactId } from '../store/ContactBook/actions'
import { selectSelectedContactId } from '../store/ContactBook/selectors'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import {
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

export default function ContactListItem(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const contact = props.contact
	const index = props.index
	const selectedContactId = useSelector(selectSelectedContactId)

	const handleClickListItem = (event, index) => {
		dispatch(setSelectedContactId(index))
	}

	return (
		<ListItem
			button
			selected={selectedContactId === index}
			onClick={(event) => {
				handleClickListItem(event, index)
			}}>
			<ListItemAvatar>
				<Avatar className={classes.avatar}>
					<ContactPhoneIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={contact.name} secondary={contact.job_title} />
		</ListItem>
	)
}
