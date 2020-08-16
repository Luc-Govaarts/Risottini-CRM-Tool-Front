import React from 'react'
import ActionTable from '../Components/ActionTable'
import { Box, Typography } from '@material-ui/core'
import PlanActionForm2 from '../Components/PlanActionForm2'

export default function Actions() {
	return (
		<>
			<Box mt={12} mx={20}>
				<Typography variant='h3'> Acties </Typography>
				<ActionTable />
			</Box>
			<Box mx={20}>
				<PlanActionForm2 />
			</Box>
		</>
	)
}
