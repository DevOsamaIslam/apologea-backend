import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import loginService from '../../controllers/services/auth/login.service'


const login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const { username, password} = formData

	const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })


	return (
		<form onSubmit={e => loginService.onSubmit(e, formData, dispatch, navigate)} >
			<input type="text" name="username" onChange={e => onChange(e)} value={username} placeholder="Username" />
			<input type="password" name="password" onChange={e => onChange(e)}  value={password} placeholder="Password" />
			<input type="submit" value="Login"/>
		</form>
	)
}

export default login