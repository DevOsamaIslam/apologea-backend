import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.authenticate = data => {
	return {
		type: keys.auth.authenticate,
		data: {
			isAuthed: data.isAuthed,
			user: data.user
		}
	}
}


export default actions