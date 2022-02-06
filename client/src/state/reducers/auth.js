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
			isAuthed: true,
			user: data.user
		}
	case auth.isAuthed:
		return {
			isAuthed: data.isAuthed,
			user: data.user
		}
	case auth.logout:
		return initialState
	default:
		return state
	}
}