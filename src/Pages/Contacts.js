import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchContacts } from '../store/appFeed/actions'
import { selectContacts } from '../store/appFeed/selectors'
import { selectToken } from '../store/user/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'

export default function Contacts() {
	const dispatch = useDispatch()
	const contacts = useSelector(selectContacts)
	const token = useSelector(selectToken)
	const history = useHistory()

	if (!token) {
		history.push('/login')
	}

	useEffect(() => {
		dispatch(fetchContacts)
	}, [dispatch])

	return (
		<>
			<Box mt={12} mx={25}>
				<Grid container direction='row' justify='flex-start'>
					<Grid item xs={6}></Grid>
					<Grid item xs={4}></Grid>
				</Grid>
			</Box>
		</>
	)
}
