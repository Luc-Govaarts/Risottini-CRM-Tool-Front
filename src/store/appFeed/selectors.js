export function selectAppFeedState(state) {
    return state.appFeed.loading
}

export function selectLeads(state) {
    return state.appFeed.leads
}

export const selectLeadById = (id) => (state) => {
    return state.appFeed.leads.find(lead => lead.id === id)
}

export function selectContacts(state) {
    return state.appFeed.contacts
}
