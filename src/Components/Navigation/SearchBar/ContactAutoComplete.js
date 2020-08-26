import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Link } from '@material-ui/core'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import { setSelectedContactId } from '../../../store/ContactBook/actions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		margin: theme.spacing(2),
	},
}))

export default function ContactAutoComplete(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const contact = props.contact
	const history = useHistory()

	const handleClick = () => {
		history.push('/contacts')
		dispatch(setSelectedContactId(contact.id))
		
	}

	return (
		<Link onClick={handleClick}>
			<Grid container alignItems='center'>
				<Grid item>
					<ContactPhoneIcon className={classes.icon} />
				</Grid>
				<Grid item xs>
					<Typography variant='body1' color='textPrimary'>
						{contact.name}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						{contact.job_title}
					</Typography>
				</Grid>
			</Grid>
		</Link>
	)
}
