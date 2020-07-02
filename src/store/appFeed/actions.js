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
  console.log("leads: ", leads)
  dispatch(storeLeads(leads))
}   