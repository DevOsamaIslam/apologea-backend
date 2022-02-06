import fetch from '../../api/fetch'
import alert from '../../../state/actions/alert'

const registerService = {}


registerService.onSubmit = async (e, formData, dispatch) => {
	e.preventDefault()
	let data = await fetch.registerUser(formData)
	dispatch(alert.set(data.feedback.type, data.feedback.message))
}

export default registerService