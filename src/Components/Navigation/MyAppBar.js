import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Box, IconButton } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkOutlineOutlined'
import ContactPhoneIcon from '@material-ui/icons/ContactPhoneOutlined'
import EventIcon from '@material-ui/icons/EventOutlined'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { selectToken } from '../../store/user/selectors'
import { useSelector } from 'react-redux'
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
					<IconButton href='/leads/add'>
						<AddCircleOutlineIcon className={classes.icon}></AddCircleOutlineIcon>
					</IconButton>
				</Box>
				<SearchBar
					style={{ width: '150px' }}
				/>
			</Toolbar>
		</AppBar>
	)
}
