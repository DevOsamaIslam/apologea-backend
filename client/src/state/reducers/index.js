import { combineReducers } from 'redux'

import auth from './auth'
import user from './user'
import blogs from './blog'


export default combineReducers({
	auth,
	user,
	blogs
})