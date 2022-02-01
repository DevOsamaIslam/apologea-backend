import strings from '../../lib/strings'

const keys = strings.state.actions

const actions = {}

actions.getFeed = feed => {
	return {
		type: keys.blog.getFeed,
		data: feed
	}
}

actions.view = blog => {
	return {
		type: keys.blog.getBlog,
		data: blog
	}
}

actions.create = blog => {
	return {
		type: keys.blog.create,
		data: blog
	}
}

actions.like = ({ blogId, userId }) => {
	return {
		type: keys.blog.like,
		data: { blogId, userId }
	}
}

actions.unlike = ({ blogId, userId }) => {
	return {
		type: keys.blog.unlike,
		data: { blogId, userId }
	}
}



export default actions