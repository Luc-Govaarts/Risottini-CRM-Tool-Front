import { apiUrl }from '../../config/constants'
import axios from "axios";

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

export function storeReportUserName(data) {
  return {
    type: "STORE_REPORT_USER_NAME", payload: data
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

export function addLead(company_name, associated_company_name, 
  company_phone, company_address, company_email, supplier) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading(true))
    const state = getState()
    const token = state.user.token 
    console.log("CHEKCING FORM DATA:", company_name, associated_company_name, 
    company_phone, company_address, company_email, supplier)
    const res = await axios({method: 'post',
                              url: `${apiUrl}/leads`,
                              data: {
                                company_name, associated_company_name, 
                                company_phone, company_address, company_email, supplier
                              },
                              headers: {'Authorization': `Bearer ${token}`}
                            })       
    console.log("Response:", res)
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
                              headers: {'Authorization': `Bearer ${token}`}                         
  })
    console.log(res.data)
    dispatch(storeNewContact(res.data)) 
  }
}

export function fetchUserById(id) {
  return async function thunk(dispatch, getState) {
    const res = await axios.get(`/users/${id}`)
    dispatch(storeReportUserName(res.data))
    console.log(res.data)
  }
} 
