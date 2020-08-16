import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAction, fetchLeads } from '../store/appFeed/actions'
import { selectLeads } from '../store/appFeed/selectors'
import {
	FormControl,
	Select,
	MenuItem,
	Box,
	Card,
	CardHeader,
	CardContent,
	Button,
	TextField,
} from '@material-ui/core'
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'

export default function PlanActionForm() {
	const dispatch = useDispatch()
	const leads = useSelector(selectLeads)
	const [action, set_action] = useState('')
	const [date, set_date] = useState(new Date())
	const [time, set_time] = useState(new Date())
	const [note, set_note] = useState('')
	const [leadId, set_leadId] = useState('')
	const due_date = `${moment(date).format('YYYY-MM-DD')} ${moment(time).format(
		'HH:mm:ss'
	)}`

	useEffect(() => {
		if (!leads[0]) {
			dispatch(fetchLeads)
		}
	}, [dispatch])

	const submitHandler = (event) => {
		event.preventDefault()

		dispatch(createAction(leadId, action, due_date, note))

		set_action('')
		set_date(new Date())
		set_time(new Date())
		set_note('')
		set_leadId('')
	}
	console.log('******LEADS****:', leads)

	if (!leads) {
		return null
	} else {
		return (
			<Card>
				<Box m={3}>
					<CardHeader title='Plan een actie' />
					<CardContent>
						<form onSubmit={submitHandler}>
							<FormControl fullWidth>
								<Select
									value={leadId}
									onChange={(e) => set_leadId(e.target.value)}
									variant='outlined'
									label='lead'>
									{leads.map((lead) => {
										return (
											<MenuItem key={lead.id} value={lead.id}>
												{lead.company_name}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<TextField
								onChange={(e) => {
									set_action(e.target.value)
								}}
								value={action}
								variant='outlined'
								margin='normal'
								id='action'
								required
								fullWidth
								autoFocus
							/>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='YYYY-MM-DD'
									margin='normal'
									id='date-picker-inline'
									label='Datum'
									value={date}
									onChange={(date) => set_date(date)}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
								<KeyboardTimePicker
									margin='normal'
									id='time-picker'
									label='Tijd'
									value={time}
									onChange={(time) => set_time(time)}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
								/>
							</MuiPickersUtilsProvider>
							<TextField
								onChange={(e) => {
									set_note(e.target.value)
								}}
								value={note}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='noteAction'
								label='Notitie'
								autoFocus
							/>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								color='primary'>
								Bewaren
							</Button>
						</form>
					</CardContent>
				</Box>
			</Card>
		)
	}
}
