import asyncHandler from '../../lib/utils'
import blog from '../../state/actions/blog'
import fetch from '../api/fetch'

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

export default blogService