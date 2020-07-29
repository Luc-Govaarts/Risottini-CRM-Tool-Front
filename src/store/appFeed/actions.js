import { apiUrl } from '../../config/constants'
import axios from "axios";
import { setMessage } from "../appState/actions";

export function startLoading(data) {
  return {
    type: "LOADING", payload: data
  }
}

export function storeLeads(data) {
  return {
      type: "STORE_LEADS", payload: data
  } 
}

export function storeUsers(data) {
  return {
      type: "STORE_USERS", payload: data
  } 
}

export function storeNewLead(data) {
  return {
      type: "STORE__NEW_LEAD", payload: data
  } 
}

export function storeContacts(data) {
  return {
      type: "STORE_CONTACTS", payload: data
  } 
}

export function storeReports(data) {
  return {
    type: "STORE_REPORTS", payload: data
  }
}
 
export function storeActions(data) {
  return {
    type: "STORE_ACTIONS", payload: data
  }
}

export function storeNewContact(data) {
  return {
    type: "STORE_NEW_CONTACT", payload: data
  }
}

export function storeNewReport(data) {
  return {
  type: "STORE_NEW_REPORT", payload: data
  }
}

export function storeUpdatedLead(data) {
  return {
    type: "STORE_UPDATED_LEAD", payload: data
  }
}

export function storeNewAction(data) {
  return {
    type: "STORE_NEW_ACTION", payload: data
    }
}

export function storeAdjustedReport(data) {
  return {
      type: "STORE_ADJUSTED_REPORT", payload: data
  } 
}

export function storeAdjustedAction(data) {
  return {
      type: "STORE_ADJUSTED_ACTION", payload: data
  } 
}

export function removeReport(data) {
  return {
      type: "REMOVE_REPORT", payload: data
  } 
}

export async function fetchUsers(dispatch, getState) {
  dispatch(startLoading(true))
  const state = getState()
  const token = state.user.token 
  const res = await axios({method: 'get',
                            url: `${apiUrl}/users`,
                            headers: {'Authorization': `Bearer ${token}`}})
  const users = res.data                        
  dispatch(storeUsers(users))
}  

export async function fetchLeads(dispatch, getState) {
  dispatch(startLoading(true))
  const state = getState()
  const token = state.user.token 
  const res = await axios({method: 'get',
                            url: `${apiUrl}/leads`,
                            headers: {'Authorization': `Bearer ${token}`}})
  const leads = res.data                            
  dispatch(storeLeads(leads))
}   
export function updateContact(contactId, leadId) {
  return async function updateContact(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({ method: 'patch',
                              url: `${apiUrl}/leads/${leadId}/contact`,
                              data: {contactId},
                              headers: {'Authorization': `Bearer ${token}`}})             
    dispatch(storeUpdatedLead(res.data))
  } 
}

export async function fetchContacts(dispatch, getState) {
  dispatch(startLoading(true))
  const state = getState()
  const token = state.user.token 
  const res = await axios({method: 'get',
                            url: `${apiUrl}/contacts`,
                            headers: {'Authorization': `Bearer ${token}`}})
  const contacts = res.data                    
  dispatch(storeContacts(contacts))
}  

export function fetchReportsById(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({method: 'get',
                              url: `${apiUrl}/reports/${id}`,
                              headers: {'Authorization': `Bearer ${token}`}})
    const reports = res.data                    
    dispatch(storeReports(reports))
  }  
}

export function fetchActionsById(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({method: 'get',
                              url: `${apiUrl}/actions/${id}`,
                              headers: {'Authorization': `Bearer ${token}`}})
    const actions = res.data                    
    dispatch(storeActions(actions))
  }  
}

export function addLead(company_name, associated_company_name,
                        company_phone, company_address, 
                        company_email, supplier, contactId) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const userId = state.user.id
    
    const res = await axios({method: 'post',
                              url: `${apiUrl}/leads`,
                              data: {
                                company_name, associated_company_name, 
                                company_phone, company_address, 
                                company_email, supplier,
                                contactId, userId
                              },
                              headers: {'Authorization': `Bearer ${token}`}
                            })       
    dispatch(storeNewLead(res.data))

    dispatch(setMessage("succes", true, "Nieuwe Lead, laat de ballen maar rollen"))
  }
}

export function addContact(contact_name, contact_email, contact_phone, job_title) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({method: 'post',
                              url: `${apiUrl}/contacts`,
                              data: {contact_name, contact_email, 
                                    contact_phone, job_title},
                              headers: {'Authorization': `Bearer ${token}`}})
  
    dispatch(storeNewContact(res.data))
    dispatch(setMessage("succes", true, "Nieuw contact toegevoegd!"))
  }
}

export function addNewReport(note, leadId) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const userId = state.user.id

    const res = await axios({ method: 'post',
                              url: `${apiUrl}/reports`,
                              data: {userId, note, leadId},
                              headers: {'Authorization': `Bearer ${token}`}})
    dispatch(storeNewReport(res.data))
  }
}

export function changePhaseTo(newPhaseId, id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({ method: 'patch',
                              url: `${apiUrl}/leads/${id}/phase`,
                              data: {newPhaseId},
                              headers: {'Authorization': `Bearer ${token}`}})
    dispatch(storeUpdatedLead(res.data))
  }
}

export function createAction(leadId, action, due_date, note) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const userId = state.user.id
    const res = await axios({ method: 'post',
                              url: `${apiUrl}/actions`,
                              data: {leadId, userId, action, due_date, note},
                              headers: {'Authorization': `Bearer ${token}`}})
    dispatch(storeNewAction(res.data))
  }
}

export function adjustReport(reportId, adjusted_note, userId, leadId) {
  return async function(dispatch, getState) {
    const upToDateReport = {
      id: reportId,
      note: adjusted_note,
      userId: userId,
      leadId: leadId
    }
    const state = getState()
    const token = state.user.token 

    const res = await axios({ method: 'patch',
                              url: `${apiUrl}/reports/${reportId}`,
                              data: upToDateReport,
                              headers: {'Authorization': `Bearer ${token}`}})   
    dispatch(storeAdjustedReport(res.data))                         
  }
}

export function adjustAction( actionId, adjusted_action, 
                              adjusted_due_date, adjusted_note,
                              userId, leadId) {
  return async function(dispatch, getState) {
    const upToDateAction = {
      id: actionId,
      action: adjusted_action,
      due_date: adjusted_due_date,
      note: adjusted_note,
      userId: userId,
      leadId: leadId
    }
    const state = getState()
    const token = state.user.token 

    const res = await axios({ method: 'patch',
                              url: `${apiUrl}/actions/${actionId}`,
                              data: upToDateAction,
                              headers: {'Authorization': `Bearer ${token}`}})   
    dispatch(storeAdjustedAction(res.data))                         
  }
}

export function deleteReport(reportId) {
  return async function(dispatch, getState) {
    const state = getState()
    const token = state.user.token 
    const res = await axios({ method: 'delete',
                              url: `${apiUrl}/reports/${reportId}`,
                              headers: {'Authorization': `Bearer ${token}`}})  
    dispatch(removeReport(reportId))                          
  }
}
