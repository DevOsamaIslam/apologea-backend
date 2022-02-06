import strings from '../../lib/strings'
import fetch from '../../controllers/api/fetch'
import { asyncHandler } from '../../lib/utils'

const keys = strings.state.actions

const actions = {}

actions.getUser = id => async dispatch => {
	let data = await asyncHandler(
		fetch.getUser(id)
	)
	dispatch({
		type: keys.getUser,
		data: data.data
	})
}

export default actions