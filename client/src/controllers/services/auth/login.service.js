import auth from '../../../state/actions/auth'
import fetch from '../../api/fetch'

const loginService = {}


loginService.onSubmit = async (e, formData, dispatch, navigate) => {
	e.preventDefault()
	let data = await fetch.loginUser(formData)
	dispatch(auth.authenticate(data))
	navigate('/')
}

export default loginService