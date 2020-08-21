import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../store/user/selectors'
import ActionTable from '../Components/ActionTable'
import { Box, Grid } from '@material-ui/core'
import PlanActionForm2 from '../Components/PlanActionForm2'
import { selectActions, selectLeads } from '../store/appFeed/selectors'
import { fetchActions, fetchLeads } from '../store/appFeed/actions'

export default function Actions() {
	const token = useSelector(selectToken)
	const history = useHistory()
	const dispatch = useDispatch()
	const actions = useSelector(selectActions)
	const leads = useSelector(selectLeads)
	if (!token) {
		history.push('/login')
	}
	useEffect(() => {
		if (!leads[0]) {
			dispatch(fetchLeads)
		} else if (!actions[0]) {
			dispatch(fetchActions)
		}
	}, [dispatch])

	if (!actions) {
		return null
	} else {
		return (
			<Box mt={12} mx={3}>
				<Grid container direction='row' justify='flex-start'>
					<Grid item xs={9}>
						<ActionTable actions={actions} />
					</Grid>
					<Grid item xs={3}>
						<PlanActionForm2 leads={leads} />
					</Grid>
				</Grid>
			</Box>
		)
	}
}
