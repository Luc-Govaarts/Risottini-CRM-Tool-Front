const initialState = {
	loading: true,
	leads: [],
	SalesCyclePhases: [],
	contacts: [],
	actions: [],
	reports: [],
	users: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING':
			return { ...state, loading: action.payload }
		case 'STORE_LEADS':
			return { ...state, leads: [...action.payload], loading: false }
		case 'STORE_UPDATED_LEAD':
			const newLeadsArray1 = state.leads.map((lead) =>
				lead.id === action.payload.id ? action.payload : lead
			)
			return { ...state, leads: newLeadsArray1, loading: false }
		case 'STORE_NEW_LEAD':
			return {
				...state,
				leads: [...state.leads, action.payload],
				loading: false,
			}
		case 'STORE_NEW_ACTION':
			return {
				...state,
				actions: [...state.actions, action.payload],
				loading: false,
			}
		case 'STORE_ACTIONS':
			return { ...state, actions: [...action.payload], loading: false }
		case 'UPDATE_ACTION':
			const newActionArray = state.actions.map((action) =>
				action.id === action.payload.id ? action.payload : action
			)
			return { ...state, actions: newActionArray, loading: false }
		case 'STORE_CONTACTS':
			return { ...state, contacts: [...action.payload], loading: false }
		case 'STORE_NEW_CONTACT':
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading: false,
			}
		case 'STORE_UPDATED_CONTACT':
			return {
				...state,
				contacts: [
					...state.contacts.map((contact) =>
						contact.id === action.payload.id ? action.payload : contact
					),
				],
				loading: false,
			}
		case 'REMOVE_CONTACT':
			return {
				...state,
				contacts: [
					...state.contacts.filter((contact) =>
						contact.id !== action.payload
					),
				],
				loading: false,
			}
		case 'STORE_NEW_REPORT':
			const newLeadsArray4 = state.leads.map((lead) =>
				lead.id === action.payload.leadId
					? { ...lead, reports: [...lead.reports, action.payload] }
					: lead
			)
			return {
				...state,
				leads: newLeadsArray4,
				reports: [...state.reports, action.payload],
				loading: false,
			}
		case 'STORE_REPORTS':
			return { ...state, reports: [...action.payload], loading: false }
		case 'STORE_USERS':
			return { ...state, users: [...action.payload], loading: false }
		case 'STORE_ADJUSTED_REPORT':
			const newLeadArray6 = state.leads.map((lead) => {
				if (lead.id === action.payload.leadId) {
					return lead.reports.map((report) => {
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
			return { ...state, leads: newLeadArray6, loading: false }
		case 'STORE_ADJUSTED_ACTION':
			const newLeadArray7 = state.leads.map((lead) => {
				if (lead.id === action.payload.leadId) {
					return lead.actions.map((leadAction) => {
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
			return { ...state, leads: newLeadArray7, loading: false }
		case 'REMOVE_REPORT':
			const newLeadArray8 = state.leads.map((lead) => {
				if (lead.id === action.payload.leadId) {
					const newReportArray = lead.reports.filter((report) => {
						return report.id !== action.payload.reportId
					})
					return { ...lead, reports: newReportArray }
				} else {
					return lead
				}
			})
			return { ...state, leads: newLeadArray8, loading: false }
		case 'REMOVE_ACTION':
			const newLeadArray9 = state.leads.map((lead) => {
				if (lead.id === action.payload.leadId) {
					const newActionArray = lead.actions.filter((leadAction) => {
						return leadAction.id !== action.payload.actionId
					})
					return { ...lead, actions: newActionArray }
				} else {
					return lead
				}
			})
			return { ...state, leads: newLeadArray9, loading: false }
		case 'REMOVE_LEAD':
			const newLeadArray10 = state.leads.filter((lead) => {
				return lead.id !== action.payload
			})
			return { ...state, leads: newLeadArray10, loading: false }
		default:
			return state
	}
}
