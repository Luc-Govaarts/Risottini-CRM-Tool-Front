import React from 'react'
import ActionTable from '../Components/ActionTable'
import { Box, Grid } from '@material-ui/core'
import PlanActionForm2 from '../Components/PlanActionForm2'

export default function Actions() {
	return (
		<Box mt={12} mx={3}>
			<Grid container direction='row' justify='flex-start'>
				<Grid item xs={9}>
					<Box>
						<ActionTable />
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box mt={2} ml={3}>
						<PlanActionForm2 />
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
