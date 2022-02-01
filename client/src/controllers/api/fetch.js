import request from './request'
import endpoints from '../../lib/endpoints'

const calls = {}

calls.isAuthed = async () => {
	let result = await request.GET(endpoints.isAuthed, {})
	console.log('isauthed fetch', result)
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

calls.getUser = async data => {
	let result = await request.POST(endpoints.loginUser, {
		body: data
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

calls.like = async (id, action) => {
	let result = await request.POST(endpoints.like, {
		body: {id, action},
	})
	return result
}



export default calls