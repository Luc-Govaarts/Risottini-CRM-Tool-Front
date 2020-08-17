import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectLeads,
	selectReports,
	selectActions,
	selectContacts,
} from '../../../store/appFeed/selectors'
import {
	fetchLeads,
	fetchActions,
	fetchContacts,
	fetchReports,
} from '../../../store/appFeed/actions'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import LeadAutoComplete from './LeadAutoComplete'
import ActionAutoComplete from './ActionAutoComplete'
import ReportAutoComplete from './ReportAutoComplete'
import ContactAutoComplete from './ContactAutoComplete'

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		backgroundColor: fade(theme.palette.common.white, 0.25),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.5),
		},
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(4),
		width: '450px',
	},
	searchBar: {
		width: '100px',
	},
	searchIcon: {
		padding: theme.spacing(0, 4),
		height: '100%',
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))
export default function SearchBar() {
	const classes = useStyles()
	const dispatch = useDispatch
	const leads = useSelector(selectLeads)
	const actions = useSelector(selectActions)
	const reports = useSelector(selectReports)
	const contacts = useSelector(selectContacts)
	const [searchValue, setSearchValue] = useState('')
	const [searchInputValue, setSearchInputValue] = useState('')

	useEffect(() => {
		dispatch(fetchActions)
	}, [actions])

	console.log('***LEADS***:', leads)
	console.log('***REPORTS***:', reports)
	console.log('***CONTACTS***:', contacts)
	console.log('***ACTIONS***:', actions)

	const options = [
		{ title: 'bla' },
		{ title: 'bla' },
		{ title: 'bla' },
		{ title: 'bla' },
		{ title: 'bla' },
		{ title: 'bla' },
		{ title: 'bla' },
	]
	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<Autocomplete
				id='search-bar'
				value={searchValue}
				onChange={(event, newValue) => {
					setSearchValue(newValue)
				}}
				inputValue={searchInputValue}
				onInputChange={(event, newInputValue) => {
					setSearchInputValue(newInputValue)
				}}
				options={options.map((option) => option.title)}
				renderInput={(params) => <TextField {...params} label='Search input' />}
			/>
		</div>
	)
}
