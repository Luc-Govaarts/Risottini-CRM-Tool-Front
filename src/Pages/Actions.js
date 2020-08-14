import React from 'react'
import ActionTable from '../Components/ActionTable'
import { Box, Typography } from '@material-ui/core'

export default function Actions() {
	return (
		<Box mt={12}>
			<Typography variant='h3'> Acties </Typography>
			<ActionTable />
		</Box>
	)
}
