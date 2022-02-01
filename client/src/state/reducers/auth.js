import strings from '../../lib/strings'

const { auth } = strings.state.actions

const initialState = {
	isAuthed: false,
	user: null
}

export default (state = initialState, { type, data }) => {
	switch(type) {
	case auth.authenticate:
		return {
			isAuthed: data.isAuthed,
			user: data.user
		}
	default:
		return state
	}
}