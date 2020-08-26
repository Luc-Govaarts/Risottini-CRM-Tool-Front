const initialState = {
    selectedContactId: 0
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'STORE_SELECTED_CONTACT':
            return {...state, selectedContactId: action.payload}
		default:
			return state
	}
}
