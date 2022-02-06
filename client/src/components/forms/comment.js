import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actionService from '../../controllers/services/action.service'
import './comment.css'

export default props => {
	let [formData, setFormData] = useState({
		id: props.blogId,
		comment: '',
		author: useSelector(state => state.auth.isAuthed && state.auth.user._id)
	})

	const typed = e => setFormData({ ... formData, [e.target.name]: e.target.value})
	const dispatch = useDispatch()
	return (
		<form className='add-comment-container' onSubmit={e => actionService.addComment(e, formData, dispatch)}>
			<textarea onChange={e => typed(e)} name='comment' placeholder='Enter your comment here...' />
			<input type={'submit'} value={'Add comment'} />
		</form>
	)
}