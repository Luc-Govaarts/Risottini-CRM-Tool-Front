const initialState = {
  loading: true,
  leads: [],
  SalesCyclePhases: [],
  contacts: [],
  users: []
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
    case "STORE_ACTIONS":
      const newLeadArray3 = state.leads.map(lead => lead.is === action.payload.leadId ? { ...lead, actions: [...action.payload] } : lead)
      return {...state, leads: newLeadArray3, loading: false}
    case "STORE_CONTACTS":
      return {...state, contacts: [...action.payload], loading: false}
    case "STORE_NEW_CONTACT":
      return {...state, contacts: [...state.contacts, action.payload], loading: false}
    case "STORE_NEW_REPORT":
      const newLeadsArray4 = state.leads.map(lead => lead.id === action.payload.leadId ? { ...lead, reports: [...lead.reports, action.payload] } : lead)
      return {...state, leads: newLeadsArray4, loading: false}
    case "STORE_REPORTS":
      const newLeadArray5 = state.leads.map(lead => lead.is === action.payload.leadId ? { ...lead, reports: [...action.payload] } : lead)
      return {...state, leads: newLeadArray5, loading: false}
    case "STORE_USERS":
      return {...state, users: [...action.payload], loading: false} 
    case "STORE_ADJUSTED_REPORT":
      const newLeadArray6 = state.leads.map(lead => {
        if (lead.id === action.payload.leadId) {
          return lead.reports.map(report => {
            if (report.id === action.payload.id) {
              return action.payload
            } else {
              return report
            }
          })
        } else {
          return lead
        }
      })
      return {...state, leads: newLeadArray6, loading: false}
    case "STORE_ADJUSTED_ACTION":
      const newLeadArray7 = state.leads.map(lead => {
        if (lead.id === action.payload.leadId) {
          return lead.actions.map(leadAction => {
            if (leadAction.id === action.payload.id) {
              return action.payload
            } else {
              return leadAction
            }
          })
        } else {
          return lead
        }
      })
      return {...state, leads: newLeadArray7, loading: false}    
    case "REMOVE_REPORT":
      const newLeadArray8 = state.leads.map(lead => {
        if (lead.id === action.payload.leadId) {
          const newReportArray = lead.reports.map(report => {
            if (report.id === action.payload.reportId) {
              return {}
            } else {
              return report
            }
          })
          return {...lead, reports: newReportArray }
        } else {
          return lead
        }

        return lead
      })
      return {...state, leads: newLeadArray8, loading: false}
    default:
      return state;
  }
};