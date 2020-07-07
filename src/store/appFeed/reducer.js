
const initialState = {
  loading: true,
  leads: [],
  SalesCyclePhases: [],
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING" :
      return {...state, loading: action.payload}
    case "STORE_LEADS":
      return {...state, leads: [...action.payload], loading: false}
    case "STORE_UPDATED_LEAD":
      const newLeadsArray1 = state.leads.map(lead => lead.id === action.payload.id ? action.payload : lead )
      return {...state, leads: newLeadsArray1, loading: false}
    case "STORE_NEW_LEAD":
      return {...state, leads: [...state.leads, action.payload], loading: false}
    case "STORE_NEW_ACTION": 
      const newLeadsArray2 = state.leads.map(lead => lead.id === action.payload.leadId ? { ...lead, actions: [...lead.actions, action.payload] } : lead)
      return {...state, leads: newLeadsArray2, loading: false}
    case "STORE_CONTACTS":
      return {...state, contacts: [...action.payload], loading: false}
    case "STORE_NEW_CONTACT":
      return {...state, contacts: [...state.contacts, action.payload], loading: false}
    case "STORE_NEW_REPORT":
      const newLeadsArray3 = state.leads.map(lead => lead.id === action.payload.leadId ? { ...lead, reports: [...lead.reports, action.payload] } : lead)
      return {...state, leads: newLeadsArray3, loading: false}
    default:
      return state;
  }
};