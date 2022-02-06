import strings from '../../lib/strings'
import alert from './alert'

const { auth } = strings.state.actions

const actions = {}

actions.authenticate = ({data, feedback}) => dispatch => {
	dispatch(alert.set(feedback.type, feedback.message))
	dispatch({
		type: auth.authenticate,
		data: {
			user: data.user
		}
	})
}

actions.isAuthed = ({data}) => dispatch => {

	dispatch({
		type: auth.isAuthed,
		data: {
			isAuthed: data.isAuthed,
			user: data.user
		}
	})
}

actions.logout = (type, message) => dispatch => {
	dispatch(alert.set(type, message))
	dispatch({
		type: auth.logout
	})
	
}


export default actions