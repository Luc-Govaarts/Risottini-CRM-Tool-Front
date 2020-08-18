import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Box, IconButton, InputBase } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkOutlineOutlined'
import ContactPhoneIcon from '@material-ui/icons/ContactPhoneOutlined'
import EventIcon from '@material-ui/icons/EventOutlined'
import { selectToken } from '../../store/user/selectors'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchLeads,
	fetchActions,
	fetchContacts,
	fetchReports,
} from '../../store/appFeed/actions'
import {
	selectLeads,
	selectReports,
	selectActions,
	selectContacts,
} from '../../store/appFeed/selectors'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import SearchBar from './SearchBar/SearchBar'

const useStyles = makeStyles((theme) => ({
	Toolbar: {
		width: '100%',
		position: 'fixed',
		backgroundColor: theme.palette.primary.main,
	},
	icon: {
		margin: theme.spacing('auto', 1),
	},
}))

export default function MyAppBar() {
	const classes = useStyles()
	const token = useSelector(selectToken)
	const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />

	return (
		<AppBar>
			<Toolbar className={classes.Toolbar}>
				{loginLogoutControls}
				<Box>
					<IconButton href='/'>
						<WorkIcon className={classes.icon}></WorkIcon>
					</IconButton>
					<IconButton href='/actions'>
						<EventIcon className={classes.icon}></EventIcon>
					</IconButton>
					<IconButton href='/contacts'>
						<ContactPhoneIcon className={classes.icon}></ContactPhoneIcon>
					</IconButton>
				</Box>
				<SearchBar
					style={{ width: '150px' }}
				/>
			</Toolbar>
		</AppBar>
	)
}
