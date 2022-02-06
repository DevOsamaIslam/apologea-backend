import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import blogService from '../../controllers/services/blog.service'

export default () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams
	let id = params().id
	blogService.getBlog(id, dispatch)
	let blog = useSelector(state => state.blogs.find(b => b._id === id))
	if(blog) {
		console.log('blog', blog)
		const [formData, setFormData] = useState({
			id,
			title: blog.title,
			body: blog.body
		})
		const { title, body } = formData
	
		const onChange = e => setFormData({ ... formData, [e.target.name]: e.target.value })
	
		return (
			<form onSubmit={e => blogService.edit(e, formData, dispatch, navigate)}>
				<input name="title" placeholder='Title' value={title} onChange={e => onChange(e)}/>
				<textarea name="body" placeholder='Contents' value={body} onChange={e => onChange(e)} />
				<button type='submit'>Create!</button>
			</form>
		)
	}
	else return <h1>Loading...</h1>

}