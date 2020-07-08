import { apiUrl } from '../../config/constants'
import axios from "axios";
import { setMessage } from "../appState/actions";

export function startLoading(data) {
  return (
      {type: "LOADING", payload: data}
       )
}

export function storeLeads(data) {
  return {
      type: "STORE_LEADS", payload: data
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

export function addLead(company_name, 
                        associated_company_name,
                        company_phone, 
                        company_address, 
                        company_email, 
                        supplier,
                        contactId) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))

    const state = getState()
    const token = state.user.token 
    const userId = state.user.id
    console.log("phone:", company_phone)
    const res2 = await axios({method: 'post',
                              url: `${apiUrl}/leads`,
                              data: {
                                company_name, associated_company_name, 
                                company_phone, company_address, 
                                company_email, supplier,
                                contactId, userId
                              },
                              headers: {'Authorization': `Bearer ${token}`}
                            })       
    dispatch(storeNewLead(res2.data))
    dispatch(setMessage("succes", true, "Nieuwe Lead, laat de ballen maar rollen"))
  }
}

export function addContact(contact_name, contact_email, contact_phone) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const res = await axios({method: 'post',
                              url: `${apiUrl}/contacts`,
                              data: {contact_name, contact_email, contact_phone},
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
    const name = state.user.name

    const res = await axios({ method: 'post',
                              url: `${apiUrl}/reports`,
                              data: {name, note, leadId},
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

export function createAction(leadId, action, date, note) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    const userId = state.user.id
    const res = await axios({ method: 'post',
                              url: `${apiUrl}/actions`,
                              data: {leadId, userId, action, date, note},
                              headers: {'Authorization': `Bearer ${token}`}})
    dispatch(storeNewAction(res.data))
  }
}

