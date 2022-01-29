import { combineReducers } from 'redux'

import isAuthed from './auth/isAuthed'
import user from './user'
import blog from './blog'

const { feed } = blog

export default combineReducers({
	isAuthed,
	user,
	feed
})