import strings from '../../lib/strings'
import asyncHandler from '../../lib/utils'
import fetch from '../../controllers/api/fetch'

const { blog } = strings.state.actions

const actions = {}

actions.getFeed = feed => dispatch => {
	dispatch({
		type: blog.getFeed,
		data: feed
	})
}

actions.view = data => dispatch => {
	dispatch({
		type: blog.getBlog,
		data
	})
}

actions.create = blog => dispatch =>  {
	dispatch({
		type: blog.create,
		data: blog
	})
}

actions.update = blog => dispatch => {
	dispatch({
		type: blog.update,
		data: blog
	})
}

actions.like = (blogId, userId) => async dispatch => {
	await asyncHandler(
		fetch.like(blogId)
	)
	dispatch({
		type: blog.like,
		data: { blogId, userId }
	})
}

actions.unlike = (blogId, userId) => async dispatch => {
	await asyncHandler(
		fetch.unlike(blogId)
	)
	dispatch({
		type: blog.unlike,
		data: { blogId, userId }
	})
}

actions.affirm = (blogId, userId) => async dispatch => {
	await asyncHandler(
		fetch.affirm(blogId)
	)
	dispatch({
		type: blog.affirm,
		data: { blogId, userId }
	})
}

actions.unaffirm = (blogId, userId) => async dispatch => {
	await asyncHandler(
		fetch.unaffirm(blogId)
	)
	dispatch({
		type: blog.unlike,
		data: { blogId, userId }
	})
}

actions.comment = (blogId, comment) => async dispatch => {
	let { data } = await asyncHandler(
		fetch.comment(blogId, comment)
	)
	dispatch({
		type: blog.comment,
		data
	})
}



export default actions