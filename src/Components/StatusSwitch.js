import React, { useState, useEffect } from 'react'
import { selectActionById } from '../store/appFeed/selectors'
import { fetchActions, actionStatusChange } from '../store/appFeed/actions'
import { useSelector, useDispatch } from 'react-redux'
import { TableCell, FormControlLabel, Switch } from '@material-ui/core'

export default function StatusSwitch(props) {
	const actionId = props.actionId
	const dispatch = useDispatch()
	const action = useSelector(selectActionById(actionId))
	const [status, set_status] = useState(action.done)

	useEffect(() => {
		if (!action) {
			dispatch(fetchActions)
		}
	}, [dispatch])

	const handleStatus = (event) => {
		set_status(event.target.checked)
        
		sendStatusChange(actionId, status)	
		
		dispatch(fetchActions)
    }
    
    const sendStatusChange = (actionId, status) => {
        dispatch(actionStatusChange(actionId, !status))
    }

	return (
		<TableCell>
			<FormControlLabel
				control={<Switch checked={status} onChange={handleStatus} />}
			/>
		</TableCell>
	)
}
