import auth from '../../../state/actions/auth'
import fetch from '../../api/fetch'
import asyncHandler from '../../../lib/utils'

const logoutService = {}


logoutService.logout = async (dispatch, navigate) => {
	let data = await asyncHandler(
		fetch.logoutUser()
	)
	dispatch(auth.logout(data.feedback.type, data.feedback.message))
	navigate('/')
}

export default logoutService