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

	case blog.like:
		return state.map(blog => {
			if(blog._id === data.blogId)
				blog.likes.push(data.userId)
			return blog
		})

	case blog.unlike:
		console.log('data.userId', data.userId)
		return state.map(blog => {
			blog.likes = blog.likes.filter(id => id !== data.userId)
			return blog
		})

	default:
		return state
	}
}
