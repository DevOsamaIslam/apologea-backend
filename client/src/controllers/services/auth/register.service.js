import fetch from '../../api/fetch'

const registerService = {}


registerService.onSubmit = async (e, formData) => {
	e.preventDefault()
	let data = await fetch.registerUser(formData)
	if(!data) console.log('No data returned')
	if(data.error) console.log(data.error)
	else console.log(data)
}

export default registerService