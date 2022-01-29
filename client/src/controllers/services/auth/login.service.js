import auth from '../../../state/actions/auth'
import fetch from '../../api/fetch'

const loginService = {}


loginService.onSubmit = async (e, formData, dispatch) => {
	e.preventDefault()
	let data = await fetch.loginUser(formData)
	if(!data) console.log('No data returned')
	if(data.error) console.log(data.error)
	else dispatch(auth.isAuthed(true))
}

export default loginService