import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.set = (type, message) => dispatch => {
	setTimeout(() => {
		dispatch(actions.clear())
	}, 2000)
	dispatch({
		type: keys.alert.set,
		data: {
			message,
			type
		}
	})
}

actions.clear = () => dispatch => {
	dispatch({
		type: keys.alert.clear
	})
}

export default actions