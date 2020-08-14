import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchActions, actionStatusChange } from '../store/appFeed/actions'
import { selectActions } from '../store/appFeed/selectors'
import { makeStyles } from '@material-ui/core/styles'
import {
	FormControlLabel,
	Switch,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TablePagination,
	TableSortLabel,
	Box,
	Typography,
} from '@material-ui/core'
import moment from 'moment'
import { selectUser } from '../store/user/selectors'

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
	{ id: 'actionTitle', label: 'Actie', minWidth: 120 },
	{ id: 'due_date', label: 'Datum en Tijd', minWidth: 120 },
	{ id: 'note', label: 'Notitie', minWidth: 250 },
	{ id: 'leadName', label: 'Lead', minWidth: 120 },
	{ id: 'userName', label: 'Gebruiker', minWidth: 120 },
	{ id: 'createdAt', label: 'Gecreëerd op', minWidth: 120 },
	{ id: 'updatedAt', label: 'Aangepast op', minWidth: 120 },
	{ id: 'done', label: 'Afgerond', minWidth: 100 },
]

const createRow = (action) => {
	const actionTitle = action.action
	const due_date = moment(action.due_date).format('DD MMM YYYY')
	const note = action.note
	const leadName = action.lead.company_name
	const userName = action.user.name
	const createdAt = moment(action.createdAt).format('DD MMM YYYY')
	const updatedAt = moment(action.updatedAt).format('DD MMM YYYY')
	const done = action.done
	const actionId = action.id
	const leadId = action.lead.id

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
						style={{ minWidth: column.minWidth }}>
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
		maxHeight: 440,
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
	switches: {
		margin: theme.spacing(2),
	},
}))

export default function ActionTable() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const actions = useSelector(selectActions)
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('due_date')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [onlyThisUser, setOnlyThisUser] = useState(false)

	useEffect(() => {
		dispatch(fetchActions)
	}, [dispatch])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const filteractions = (actions) => {
		if (!actions) {
			return []
		} else if (onlyThisUser) {
			return actions.filter((action) => {
				return action.userId === user.id
			})
		} else {
			return actions
		}
	}

	const filteredActions = filteractions(actions)

	const rows = filteredActions.map((action) => createRow(action))

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleChangeUserSelect = (event) => {
		setOnlyThisUser(event.target.checked)
	}

	const handleChangeDone = (actionId) => {
		dispatch(actionStatusChange(actionId))
	}

	if (!actions) {
		return null
	} else {
		return (
			<Paper className={classes.root}>
				<Box className={classes.switches}>
					<FormControlLabel
						control={
							<Switch
								checked={onlyThisUser}
								onChange={handleChangeUserSelect}
							/>
						}
						label='Aleen van deze gebruiker'
					/>
				</Box>
				<TableContainer className={classes.container}>
					<Table>
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
										<TableRow hover tabIndex={-1} key={index}>
											{columns.map((column) => {
												const value = row[column.id]
												if (column.id === 'done') {
													return (
														<TableCell>
															<FormControlLabel
																control={
																	<Switch
																		checked={row.done}
																		onChange={handleChangeDone(row.actionId)}
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
			</Paper>
		)
	}
}
