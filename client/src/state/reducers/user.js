import strings from '../../lib/strings'

const { actions } = strings.state

export default (state = null, { type, data }) => {
	switch(type) {
	case actions.getUser:
		return data
	default:
		return state
	}
}