import { combineReducers } from 'redux'
import appState from './appState/reducer'
import user from './user/reducer'
import appFeed from './appFeed/reducer'
import ContactBook from './ContactBook/reducer'

export default combineReducers({
	ContactBook,
	appFeed,
	appState,
	user,
})
