import { combineReducers } from 'redux'

import auth from './auth'
import profile from './profile'
import blogs from './blog'
import alert from './alert'

export default combineReducers({
	auth,
	profile,
	blogs,
	alert
})