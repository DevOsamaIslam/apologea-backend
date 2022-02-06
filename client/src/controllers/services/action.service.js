import blogAction from '../../state/actions/blog'
import userActions from '../../state/actions/user'

const actionService = {}
actionService.likeClicked = (dispatch, blog, user) => {
	if(user) {
		if(blog.likes.includes(user._id)) {
			dispatch(blogAction.unlike(blog._id, user._id))
		}
		else {
			dispatch(blogAction.like(blog._id, user._id))
		} 
	}
}

actionService.isLiked = (blog, user) => {
	if(user) 
		return blog.likes.includes(user._id)
	return false
}

actionService.affirmClicked = (dispatch, blog, user) => {
	if(user) {
		if(blog.affirms.includes(user._id)) {
			dispatch(blogAction.unaffirm(blog._id, user._id))
		}
		else {
			dispatch(blogAction.affirm(blog._id, user._id))
		} 
	}
}

actionService.isAffirmed = (blog, user) => {
	if(user) 
		return blog.affirms.includes(user._id)
	return false
}

actionService.authorClicked = (id, dispatch) => {
	dispatch(userActions.getUser(id))
}

actionService.addComment = (e, form, dispatch) => {
	e.preventDefault()

	dispatch(blogAction.comment(form.id, form.comment))
}

export default actionService