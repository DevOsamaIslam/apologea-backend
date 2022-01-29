import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.isAuthed = (auth) => {
	return {
		type: keys.isAuthed,
		data: auth
	}
}

export default actions