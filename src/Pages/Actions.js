import React from 'react'
import ActionTable from '../Components/ActionTable'
import { Box, Grid } from '@material-ui/core'
import PlanActionForm2 from '../Components/PlanActionForm2'

export default function Actions() {
	return (
		<Box mt={12} mx={3}>
			<Grid container direction='row' justify='flex-start'>
				<Grid item xs={9}>
						<ActionTable />
				</Grid>
				<Grid item xs={3}>
						<PlanActionForm2 />
				</Grid>
			</Grid>
		</Box>
	)
}
