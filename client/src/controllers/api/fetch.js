import request from './request'
import endpoints from '../../lib/endpoints'

const calls = {}

calls.isAuthed = async () => {
	let result = await request.GET(endpoints.isAuthed, {})
	return result
}

calls.registerUser = async data => {
	let result = await request.POST(endpoints.registerUser, {
		body: data,
	})
	return result
}

calls.loginUser = async data => {
	let result = await request.POST(endpoints.loginUser, {
		body: data
	})
	return result
}

calls.logoutUser = async () => {
	let result = await request.GET(endpoints.logoutUser, {})
	return result
}

calls.getUser = async id => {
	let result = await request.GET(endpoints.getUser, {
		query: [`id=${id}`]
	})
	return result
}

calls.getFeed = async () => {
	let result = await request.GET(endpoints.getFeed, {})
	return result
}

calls.createBlog = async data => {
	let result = await request.POST(endpoints.createBlog, {
		body: data,
	})
	return result
}

calls.getBlog = async id => {
	let result = await request.GET(endpoints.getBlog, {
		query: [`id=${id}`],
	})
	return result
}

calls.updateBlog = async data => {
	let result = await request.PATCH(endpoints.updateBlog, {
		body: data,
	})
	return result
}

calls.like = async id => {
	let result = await request.PATCH(endpoints.like, {
		body: {id, action: 'add'},
	})
	return result
}

calls.unlike = async id => {
	let result = await request.PATCH(endpoints.like, {
		body: {id, action: 'remove'},
	})
	return result
}

calls.affirm = async id => {
	let result = await request.PATCH(endpoints.affirm, {
		body: {id, action: 'add'},
	})
	return result
}

calls.unaffirm = async id => {
	let result = await request.PATCH(endpoints.affirm, {
		body: {id, action: 'remove'},
	})
	return result
}

calls.comment = async (id, comment) => {
	let result = await request.POST(endpoints.comment, {
		body: {id, action: 'add', comment},
	})
	return result
}



export default calls