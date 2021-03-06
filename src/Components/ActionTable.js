import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { actionStatusChange } from '../store/appFeed/actions'
import { makeStyles } from '@material-ui/core/styles'
import EventIcon from '@material-ui/icons/Event'
import { red, green, blue, orange } from '@material-ui/core/colors'

import {
	FormControlLabel,
	Switch,
	Card,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
	TableSortLabel,
	Box,
	CardHeader,
	CardContent,
	Avatar,
} from '@material-ui/core'
import moment from 'moment'
import { selectUser } from '../store/user/selectors'
import ActionColorLegend from './ActionColorLegend'

function descendingComparator(a, b, orderBy) {
	if (
		orderBy === 'due_date' ||
		orderBy === 'createdAt' ||
		orderBy === 'updatedAt'
	) {
		return new Date(a[orderBy]) - new Date(b[orderBy])
	}

	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

const columns = [
	{ id: 'due_date', label: 'Datum en Tijd', maxWidth: 90 },
	{ id: 'leadName', label: 'Lead', maxWidth: 75 },
	{ id: 'actionTitle', label: 'Actie', maxWidth: 75 },
	{ id: 'note', label: 'Notitie', maxWidth: 100 },
	{ id: 'userName', label: 'Gebruiker', maxWidth: 65 },
	{ id: 'createdAt', label: 'Gecreëerd op', maxWidth: 65 },
	{ id: 'updatedAt', label: 'Aangepast op', maxWidth: 65 },
	{ id: 'done', label: 'Afgerond', maxWidth: 65 },
]

const createRow = (action) => {
	const colorSetter = (due_date, done) => {
		if (moment(due_date) < moment() && done) {
			return green[100]
		} else if (moment(due_date) < moment() && !done) {
			return red[100]
		} else if (moment(due_date) > moment() && !done) {
			return blue[100]
		} else if (moment(due_date) > moment() && done) {
			return orange[100]
		}
	}
	const actionTitle = action.action
	const due_date = moment(action.due_date).format('DD MMM YYYY hh:mm')
	const note = action.note
	const leadName = action.lead.company_name
	const userName = action.user.name
	const createdAt = moment(action.createdAt).format('DD MMM YYYY')
	const updatedAt = moment(action.updatedAt).format('DD MMM YYYY')
	const done = action.done
	const actionId = action.id
	const leadId = action.lead.id
	const color = colorSetter(due_date, done)

	return {
		actionTitle,
		due_date,
		note,
		leadName,
		userName,
		createdAt,
		updatedAt,
		done,
		actionId,
		leadId,
		color,
	}
}

const MyTableHead = (props) => {
	const { classes, order, orderBy, onRequestSort } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => (
					<TableCell
						key={column.id}
						sortDirection={orderBy === column.id ? order : false}
						style={{ maxWidth: column.maxWidth }}
						align='center'>
						<TableSortLabel
							active={orderBy === column.id}
							direction={orderBy === column.id ? order : 'asc'}
							onClick={createSortHandler(column.id)}>
							{column.label}
							{orderBy === column.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

MyTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 500,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	head: {
		margin: theme.spacing(3),
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
}))

export default function ActionTable(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const user = useSelector(selectUser)
	const actions = props.actions
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('due_date')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [onlyThisUser, setOnlyThisUser] = useState(false)
	const [onlyActiveActions, setOnlyActiveActions] = useState(true)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const filterActions = (actions) => {
		if (!actions) {
			return []
		} else if (onlyThisUser && onlyActiveActions) {
			const activeActions = actions.filter((action) => {
				return !action.done
			})
			return activeActions.filter((action) => {
				return action.userId === user.id
			})
		} else if (onlyThisUser && !onlyActiveActions) {
			return actions.filter((action) => {
				return action.userId === user.id
			})
		} else if (!onlyThisUser && onlyActiveActions) {
			return actions.filter((action) => {
				return !action.done
			})
		} else if (!onlyThisUser && !onlyActiveActions) {
			return actions
		} else {
			return actions
		}
	}

	const handleChangeUserSelect = (event) => {
		setOnlyThisUser(event.target.checked)
	}

	const handleChangeActiveActions = (event) => {
		setOnlyActiveActions(event.target.checked)
	}
	const filteredActions = filterActions(actions)

	const rows = filteredActions.map((action) => createRow(action))

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleStatus = (event, actionId) => {
		dispatch(actionStatusChange(actionId, event.target.checked))
	}

	const handleClickRow = (event, leadId) => {
		event.preventDefault()
		return history.push(`/leads/${leadId}`) 
	}

	return (
		<Card className={classes.root}>
			<CardHeader
				title='Acties'
				avatar={
					<Avatar className={classes.avatar}>
						<EventIcon />
					</Avatar>
				}
				action={
					<Box>
						<FormControlLabel
							control={
								<Switch
									checked={onlyThisUser}
									onChange={handleChangeUserSelect}
								/>
							}
							label='Aleen van deze gebruiker'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={onlyActiveActions}
									onChange={handleChangeActiveActions}
								/>
							}
							label='geen afgronde acties'
						/>
						<ActionColorLegend />
					</Box>
				}></CardHeader>
			<CardContent>
				<TableContainer className={classes.container}>
					<Table size='small'>
						<MyTableHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TableRow
											style={{ backgroundColor: row.color }}
											hover
											tabIndex={-1}
											key={index}
											onClick={(event) => handleClickRow(event, row.leadId)}>
											{columns.map((column) => {
												const value = row[column.id]
												if (column.id === 'done') {
													return (
														<TableCell key={column.id}>
															<FormControlLabel
																control={
																	<Switch
																		checked={row.done}
																		onChange={(event) =>
																			handleStatus(event, row.actionId)
																		}
																	/>
																}
															/>
														</TableCell>
													)
												} else {
													return <TableCell key={column.id}>{value}</TableCell>
												}
											})}
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</CardContent>
		</Card>
	)
}
