import strings from '../../../lib/strings'

const { isAuthed } = strings.state.actions

export default (state = false, { type }) => {
	switch(type) {
	case isAuthed:
		return true
	default:
		return state
	}
}