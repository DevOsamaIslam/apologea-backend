import { useState } from 'react'

import registerService from '../../controllers/services/auth/register.service'

const register = () => {

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	})
	const { username, email, password} = formData

	const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })

	return (
		<form onSubmit={e => registerService.onSubmit(e, formData)} >
			<input 
				type="text" 
				name="username" 
				value={username} 
				onChange={e => onChange(e)} 
				placeholder="Username" />

			<input 
				type="email" 
				name="email" 
				value={email} 
				onChange={e => onChange(e)} 
				placeholder="Email" />

			<input 
				type="password" 
				name="password" 
				value={password} 
				onChange={e => onChange(e)} 
				placeholder="Password" />

			<input type="submit" value="Register"/>
		</form>
	)
}

export default register