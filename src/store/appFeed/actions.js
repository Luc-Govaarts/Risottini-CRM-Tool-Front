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