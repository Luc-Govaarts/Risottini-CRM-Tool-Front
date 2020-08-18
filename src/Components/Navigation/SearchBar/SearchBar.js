import React, { useState, useEffect } from 'react'
import { TextField, Box } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import LeadAutoComplete from './LeadAutoComplete'
import ActionAutoComplete from './ActionAutoComplete'
import ReportAutoComplete from './ReportAutoComplete'
import ContactAutoComplete from './ContactAutoComplete'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchLeads,
	fetchActions,
	fetchContacts,
	fetchReports,
} from '../../../store/appFeed/actions'
import {
	selectLeads,
	selectReports,
	selectActions,
	selectContacts,
} from '../../../store/appFeed/selectors'

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		margin: theme.spacing(1),
		width: '300px',
	},
	searchBox: {
		width: '100%',
	},
}))
export default function SearchBar(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const leads = useSelector(selectLeads)
	const reports = useSelector(selectReports)
	const actions = useSelector(selectActions)
	const contacts = useSelector(selectContacts)
	const options = leads.concat(reports).concat(contacts).concat(actions) || []
	const [searchInputValue, setSearchInputValue] = useState('')

	useEffect(() => {
		dispatch(fetchLeads)
		dispatch(fetchActions)
		dispatch(fetchReports)
		dispatch(fetchContacts)
	}, [])

	const optionLabelSwitch = (option) => {
		if (option.hasOwnProperty('company_name')) {
			return option.company_name
		} else if (option.hasOwnProperty('action')) {
			return option.action
		} else if (option.hasOwnProperty('name')) {
			return option.name
		} else {
			return option.note
		}
	}

	const renderOptionSwitch = (option) => {
		if (option.hasOwnProperty('company_name')) {
			return <LeadAutoComplete lead={option} />
		} else if (option.hasOwnProperty('action')) {
			return <ActionAutoComplete action={option} />
		} else if (option.hasOwnProperty('name')) {
			return <ContactAutoComplete contact={option} />
		} else {
			return <ReportAutoComplete report={option} />
		}
	}

	return (
		<div className={classes.search}>
			<Autocomplete
				id='search-bar'
				inputValue={searchInputValue}
				onInputChange={(event, newInputValue) => {
					setSearchInputValue(newInputValue)
				}}
				getOptionLabel={optionLabelSwitch}
				options={options}
				renderInput={(params) => (
					<TextField
						{...params}
						className={classes.searchBox}
						variant='outlined'
						label='Zoek ...'
					/>
				)}
				renderOption={renderOptionSwitch}
			/>
		</div>
	)
}
