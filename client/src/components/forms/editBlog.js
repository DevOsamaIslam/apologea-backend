import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import blogService from '../../controllers/services/blog.service'

export default () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		title: '',
		body: ''
	})
	const { title, body} = formData

	const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })

	return (
		<form onSubmit={e => blogService.create(e, formData, dispatch, navigate)}>
			<input name="title" placeholder='Title' value={title} onChange={e => onChange(e)}/>
			<textarea name="body" placeholder='Contents' value={body} onChange={e => onChange(e)} />
			<button type='submit'>Create!</button>
		</form>
	)
}