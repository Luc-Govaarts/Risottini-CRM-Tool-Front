import { apiUrl } from '../../config/constants'
import axios from 'axios'
import { setMessage } from '../appState/actions'

export function startLoading(data) {
	return {
		type: 'LOADING',
		payload: data,
	}
}

export function storeLeads(data) {
	return {
		type: 'STORE_LEADS',
		payload: data,
	}
}

export function storeUsers(data) {
	return {
		type: 'STORE_USERS',
		payload: data,
	}
}

export function storeNewLead(data) {
	return {
		type: 'STORE__NEW_LEAD',
		payload: data,
	}
}

export function storeContacts(data) {
	return {
		type: 'STORE_CONTACTS',
		payload: data,
	}
}

export function storeReports(data) {
	return {
		type: 'STORE_REPORTS',
		payload: data,
	}
}

export function storeActions(data) {
	return {
		type: 'STORE_ACTIONS',
		payload: data,
	}
}

export function storeNewContact(data) {
	return {
		type: 'STORE_NEW_CONTACT',
		payload: data,
	}
}

export function storeNewReport(data) {
	return {
		type: 'STORE_NEW_REPORT',
		payload: data,
	}
}

export function storeUpdatedLead(data) {
	return {
		type: 'STORE_UPDATED_LEAD',
		payload: data,
	}
}

export function storeNewAction(data) {
	return {
		type: 'STORE_NEW_ACTION',
		payload: data,
	}
}

export function storeAdjustedReport(data) {
	return {
		type: 'STORE_ADJUSTED_REPORT',
		payload: data,
	}
}

export function storeAdjustedAction(data) {
	return {
		type: 'STORE_ADJUSTED_ACTION',
		payload: data,
	}
}

export function removeReport(data) {
	return {
		type: 'REMOVE_REPORT',
		payload: data,
	}
}

export function removeAction(data) {
	return {
		type: 'REMOVE_ACTION',
		payload: data,
	}
}

export function removeLead(data) {
	return {
		type: 'REMOVE_LEAD',
		payload: data,
	}
}

export async function fetchUsers(dispatch, getState) {
	dispatch(startLoading(true))
	const state = getState()
	const token = state.user.token
	const res = await axios({
		method: 'get',
		url: `${apiUrl}/users`,
		headers: { Authorization: `Bearer ${token}` },
	})
	const users = res.data
	dispatch(storeUsers(users))
}

export async function fetchLeads(dispatch, getState) {
	dispatch(startLoading(true))
	const state = getState()
	const token = state.user.token
	const res = await axios({
		method: 'get',
		url: `${apiUrl}/leads`,
		headers: { Authorization: `Bearer ${token}` },
	})
	const leads = res.data
	dispatch(storeLeads(leads))
}

export function updateContact(contactId, leadId) {
	return async function updateContact(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/leads/${leadId}/contact`,
			data: { contactId },
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeUpdatedLead(res.data))
		dispatch(setMessage('success', true, 'Contact updated succesfully'))
	}
}

export async function fetchContacts(dispatch, getState) {
	dispatch(startLoading(true))
	const state = getState()
	const token = state.user.token
	const res = await axios({
		method: 'get',
		url: `${apiUrl}/contacts`,
		headers: { Authorization: `Bearer ${token}` },
	})
	const contacts = res.data
	dispatch(storeContacts(contacts))
}

export async function fetchReports(dispatch, getState) {
	dispatch(startLoading(true))
	const state = getState()
	const token = state.user.token
	const res = await axios({
		method: 'get',
		url: `${apiUrl}/reports`,
		headers: {Authorization: `Bearer ${token}`}
	})
	const reports = res.data
	dispatch(storeReports(reports))
}

export function fetchReportsById(id) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const res = await axios({
			method: 'get',
			url: `${apiUrl}/reports/${id}`,
			headers: { Authorization: `Bearer ${token}` },
		})
		const reports = res.data
		dispatch(storeReports(reports))
	}
}

export async function fetchActions(dispatch, getState) {
	dispatch(startLoading(true))
	const state = getState()
	const token = state.user.token
	const res = await axios({
		method: 'get',
		url: `${apiUrl}/actions`,
		headers: { Authorization: `Bearer ${token}` },
	})
	const actions = res.data
	dispatch(storeActions(actions))
}

export function addLead(
	company_name,
	associated_company_name,
	company_phone,
	company_address,
	company_email,
	supplier,
	contactId
) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const userId = state.user.id

		const res = await axios({
			method: 'post',
			url: `${apiUrl}/leads`,
			data: {
				company_name,
				associated_company_name,
				company_phone,
				company_address,
				company_email,
				supplier,
				contactId,
				userId,
			},
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeNewLead(res.data))

		dispatch(setMessage('success', true, 'Added new lead succesfully'))
	}
}

export function addContact(
	contact_name,
	contact_email,
	contact_phone,
	job_title
) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const res = await axios({
			method: 'post',
			url: `${apiUrl}/contacts`,
			data: { contact_name, contact_email, contact_phone, job_title },
			headers: { Authorization: `Bearer ${token}` },
		})

		dispatch(storeNewContact(res.data))
		dispatch(setMessage('success', true, 'New contact added succesfully'))
	}
}

export function addNewReport(note, leadId) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const userId = state.user.id

		const res = await axios({
			method: 'post',
			url: `${apiUrl}/reports`,
			data: { userId, note, leadId },
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeNewReport(res.data))
		dispatch(setMessage('success', true, 'new report added succesfully'))
	}
}

export function changePhaseTo(newPhaseId, id) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/leads/${id}/phase`,
			data: { newPhaseId },
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeUpdatedLead(res.data))
		dispatch(
			setMessage(
				'info',
				true,
				'The sales cycle phase was adjusted, great work champ!'
			)
		)
	}
}

export function createAction(leadId, action, due_date, note) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const userId = state.user.id
		const res = await axios({
			method: 'post',
			url: `${apiUrl}/actions`,
			data: { leadId, userId, action, due_date, note },
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeNewAction(res.data))
		dispatch(setMessage('success', true, 'Created a new action, go get them!'))
	}
}

export function adjustReport(reportId, adjusted_note, userId, leadId) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const upToDateReport = {
			id: reportId,
			note: adjusted_note,
			userId: userId,
			leadId: leadId,
		}
		const state = getState()
		const token = state.user.token

		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/reports/${reportId}`,
			data: upToDateReport,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeAdjustedReport(res.data))
		dispatch(setMessage('info', true, 'The report was adjusted'))
	}
}

export function adjustAction(
	actionId,
	adjusted_action,
	adjusted_due_date,
	adjusted_note,
	userId,
	leadId
) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const upToDateAction = {
			id: actionId,
			action: adjusted_action,
			due_date: adjusted_due_date,
			note: adjusted_note,
			userId: userId,
			leadId: leadId,
		}
		const state = getState()
		const token = state.user.token

		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/actions/${actionId}`,
			data: upToDateAction,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeAdjustedAction(res.data))
		dispatch(setMessage('info', true, 'The report was adjusted'))
	}
}

export function deleteReport(reportId, leadId) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		await axios({
			method: 'delete',
			url: `${apiUrl}/reports/${reportId}`,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(removeReport({ reportId: reportId, leadId: leadId }))
		dispatch(setMessage('info', true, 'The report was deleted'))
	}
}

export function deleteAction(actionId, leadId) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		await axios({
			method: 'delete',
			url: `${apiUrl}/actions/${actionId}`,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(removeAction({ actionId: actionId, leadId: leadId }))
		dispatch(setMessage('info', true, 'The action was deleted'))
	}
}

export function adjustLead(
	leadId,
	company_name,
	associated_company_name,
	company_phone,
	company_address,
	company_email,
	supplier
) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const upToDateLead = {
			id: leadId,
			company_name: company_name,
			associated_company_name: associated_company_name,
			company_phone: company_phone,
			company_address: company_address,
			company_email: company_email,
			supplier: supplier,
		}
		const state = getState()
		const token = state.user.token

		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/leads/${leadId}`,
			data: upToDateLead,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeUpdatedLead(res.data))
		dispatch(
			setMessage('info', true, 'The lead info was adjusted succesfully!')
		)
	}
}

export function deleteLead(leadId) {
	return async function (dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		await axios({
			method: 'delete',
			url: `${apiUrl}/leads/${leadId}`,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(removeLead(leadId))
		dispatch(setMessage('error', true, 'The lead has been deleted!'))
	}
}

export function actionStatusChange(actionId, status) {
	return async function thunk(dispatch, getState) {
		dispatch(startLoading(true))
		const state = getState()
		const token = state.user.token
		const data = {
			status: status,
		}
		const res = await axios({
			method: 'patch',
			url: `${apiUrl}/actions/${actionId}/status`,
			data: data,
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch(storeAdjustedAction(res.data))
		dispatch(
			setMessage('succes', true, 'The action status was updated succesfully!')
		)
	}
}
