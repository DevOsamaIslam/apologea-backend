import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import fetch from '../../controllers/api/fetch'
import asyncHandler from '../../lib/utils'
import Card from './card'
import blogActions from '../../state/actions/blog'

let dispatched = false

export default () => {
	let id = useParams('id').id
	let dispatch = useDispatch()
	let blogs = useSelector(state => state.blogs)
	let blog = blogs.find(blog => blog._id === id)

	getBlog(id, dispatch)

	if(blog && blog.body)
		return (<Card data={blog}/>)
	else return <h1>Loading...</h1>

}

const getBlog = async (id, dispatch) => {
	if(!dispatched) {
		let data = await asyncHandler(
			fetch.getBlog(id)
		)
		dispatch(blogActions.view(data))
		dispatched = true
	}

}

