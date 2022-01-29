const api = 'http://localhost:5000/api'

export default {
	registerUser: api + '/auth/register',
	loginUser: api + '/auth/login',

	getUser: api + '/user',
	getFeed: api + '/feed',

	getBlog: api + '/blog/view',
	createBlog: api + '/blog/new',
	updateBlog: api + '/blog/update',
	deleteBlog: api + '/blog/delete',

	like: api + '/actions/like',
	comment: api + '/actions/comment',
	affirm: api + '/actions/affirm',
	respond: api + '/actions/respond',

}