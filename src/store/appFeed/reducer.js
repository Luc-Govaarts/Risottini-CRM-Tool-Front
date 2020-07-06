
const initialState = {
  loading: true,
  leads: [],
  SalesCyclePhases: [],
  contacts: [],
  reportOwner: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING" :
      return {...state, loading: action.payload}
    case "STORE_LEADS":
      return {...state, leads: [...action.payload], loading: false}
    case "STORE_CONTACTS":
      return {...state, contacts: [...action.payload], loading: false}
    case "STORE_NEW_CONTACT":
      return {...state, contacts: [...state.contacts, action.payload], loading: false}
    case "STORE_NEW_REPORT":
      const updatedLeads = state.leads.map(lead => lead.id === action.payload.leadId ? { ...lead, reports: [...lead.reports, action.payload] } : lead)
      return {...state, leads: updatedLeads, loading: false}
    // // case "STORE_REPORT_USER_NAME":
    // //   return {...state, reportOwner: action.payload}
    default:
      return state;
  }
};