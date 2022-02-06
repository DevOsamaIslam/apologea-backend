export default {
	serverAddress: 'http://localhost:5000',
	clientAddress: 'http://localhost:3000',
	success: {
		key: 'success',
		registered: 'Welcome onboard',
		login: 'You are logged in, welcome back',
		logout: 'You have logged out, take care.',
		blogViewed: 'Blog found!',
		blogUpdated: 'Blog updated successfully!',
		blogDeleted: 'Blog deleted successfully!',
		like: 'Like changed!',
		comment: 'comment added!'
	},
	error: {
		key: 'error',
		SWR: 'Something went wrong :(',
		userExists: 'User exists. Please choose a different name',
		wrongUsernamePassword: 'Username or password wrong',
	},
	warning: {
		key: 'warning',
		noData: 'No data found.',
		unauthorized: 'Not allowed to access.'
	}
}