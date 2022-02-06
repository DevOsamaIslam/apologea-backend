import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Card from './card'
import blogService from '../../controllers/services/blog.service'

import './blog.css'


export default () => {
	let id = useParams('id').id
	let dispatch = useDispatch()
	let blogs = useSelector(state => state.blogs)
	let blog = blogs.find(blog => blog._id === id)
	if(blog && !blog.body)
		blogService.getBlog(id, dispatch)

	if(blog && blog.body)
		return (
			<div className='view-container'>
				<Card data={blog}/>
			</div>
		)
	else return <h1>Loading...</h1>

}

