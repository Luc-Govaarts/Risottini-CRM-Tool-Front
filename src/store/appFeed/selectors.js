export function selectAppFeedState(state) {
    return state.appFeed.loading
}

export function selectLeads(state) {
    return state.appFeed.leads
}

export function selectActions(state) {
    return state.appFeed.actions
}

export function selectUsers(state) {
    return state.appFeed.users
}

export const selectActionById = (id) => (state) => {
    return state.appFeed.actions.find(action => action.id === id)
}

export function selectContacts(state) {
    return state.appFeed.contacts
}

export function selectReports(state) {
    return state.appFeed.reports
}

export const selectLeadById = (id) => (state) => {
    return state.appFeed.leads.find(lead => lead.id === id)
}


export const selectUserById = (id) => (state) => {
    return state.appFeed.users.find(user => user.id === id)
}

export const selectContactNameById = (id) => (state) => {
    const contact = state.appFeed.contacts.find(contact => contact.id === id)
    return contact.name
}

export const selectLeadIdByName = (name) => (state) => {
    const lead = state.appFeed.leads.find(lead => lead.company_name === name)
    return lead.id
}
