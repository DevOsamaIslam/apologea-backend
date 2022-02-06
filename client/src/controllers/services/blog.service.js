import asyncHandler from '../../lib/utils'
import blog from '../../state/actions/blog'
import fetch from '../api/fetch'
import blogActions from '../../state/actions/blog'

let blogService = {}

blogService.create = async (e, form, dispatch, navigate) => {
	e.preventDefault()

	let data = await asyncHandler(
		fetch.createBlog(form)
	)
	if(!data) console.log('No data returned')
	else if(data.error) console.error(data.error)
	else {
		dispatch(blog.create(data))
		navigate(`/blog/${data._id}`)	
	}
	
}

blogService.edit = async (e, form, dispatch, navigate) => {
	e.preventDefault()
	console.log('form', form)
	let data = await asyncHandler(
		fetch.updateBlog(form)
	)
	if(!data) console.log('No data returned')
	else if(data.error) console.error(data.error)
	else {
		dispatch(blog.update(data))
		navigate(`/blog/${data._id}`)	
	}
	
}

blogService.getBlog = async (id, dispatch) => {
	let { data } = await asyncHandler(
		fetch.getBlog(id)
	)
	dispatch(blogActions.view(data))
	return data
}

export default blogService