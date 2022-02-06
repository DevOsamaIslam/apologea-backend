import strings from '../../lib/strings'

const { alert } = strings.state.actions

const initialState = {
	message: null,
	type: null
}

export default (state = initialState, { type, data }) => {
	switch(type) {
	case alert.set:
		return {
			message: data.message,
			type: data.type
		}
	case alert.clear:
		return initialState
	default:
		return state
	}
}