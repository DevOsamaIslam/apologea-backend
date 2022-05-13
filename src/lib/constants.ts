export const serverAddress = `${process.env.HOST}:${process.env.PORT}`
export const basePath = '/api/'
export const clientAddress = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
export const success = {
	key: 'success',
	registered: 'Welcome onboard',
	login: 'You are logged in, welcome back',
	logout: 'You have logged out, take care.',
	blogCreated: 'Blog created successfully!',
	blogsFound: 'Blogs found!',
	blogFound: 'Blog found!',
	blogUpdated: 'Blog updated successfully!',
	blogDeleted: 'Blog deleted successfully!',
	like: 'Like changed!',
	comment: 'comment added!',
	search: 'Blogs searched!',
}
export const error = {
	key: 'error',
	SWR: 'Something went wrong  :(',
	userExists: 'User exists. Please choose a different name',
	wrongUsernamePassword: 'Username or password wrong',
}
export const warning = {
	key: 'warning',
	noData: 'No data found.',
	unauthorized: 'Not allowed to access.',
}

export const schemaNames = {
	user: 'User',
	blog: 'Blog',
	debate: 'Debate',
}
