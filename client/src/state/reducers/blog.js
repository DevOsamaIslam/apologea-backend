import strings from '../../lib/strings'

const { blog } = strings.state.actions

export default (state = [], { type, data }) => {
	switch(type) {
	case blog.getFeed:
		return data || []

	case blog.getBlog:
		return state.map(blog => {
			if(blog._id === data._id)
				blog = data
			return blog
		})

	case blog.create:
		return [...state, data]

	case blog.update:
		return state.map(blog => {
			if(blog._id === data._id)
				blog = data
			return blog
		})

	case blog.like:
		return state.map(blog => {
			if(blog._id === data.blogId)
				blog.likes.push(data.userId)
			return blog
		})

	case blog.unlike:
		return state.map(blog => {
			blog.likes = blog.likes.filter(id => id !== data.userId)
			return blog
		})

	case blog.affirm:
		return state.map(blog => {
			if(blog._id === data.blogId)
				blog.affirms.push(data.userId)
			return blog
		})
	
	case blog.unaffirm:
		return state.map(blog => {
			blog.affirms = blog.affirms.filter(id => id !== data.userId)
			return blog
		})

	case blog.comment:
		return state.map(blog => {
			if(blog._id === data._id)
				blog = data
			return blog
		})

	default:
		return state
	}
}
