import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.getUser = () => {
	return {
		type: keys.isAuthed
	}
}

export default actions