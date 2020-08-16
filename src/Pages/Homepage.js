import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchLeads, fetchUsers } from '../store/appFeed/actions'
import { selectLeads } from '../store/appFeed/selectors'
import { selectToken } from '../store/user/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import HomePageMap from '../Components/HomePageMap'
import LeadsTable from '../Components/LeadsTable'

export default function Homepage() {
	const dispatch = useDispatch()
	const leads = useSelector(selectLeads)
	const token = useSelector(selectToken)
	const history = useHistory()

	if (!token) {
		history.push('/login')
	}

	useEffect(() => {
		dispatch(fetchLeads)
		dispatch(fetchUsers)
	}, [dispatch])

	return (
		<>
			<Box mt={12} mx={25} height='450px'>
				<HomePageMap leads={leads} />
			</Box>
			<Box mx={25}>
				<LeadsTable leads={leads} />
			</Box>
		</>
	)
}
