import { config } from 'dotenv'

config()

export const SERVER_ADDRESS = `${process.env.HOST}:${process.env.PORT}`
export const BASE_PATH = '/api/'
export const CLIENT_ADDRESS = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
export const AUTH = {
	method: process.env.AUTH_METHOD || 'jwt',
	secret: process.env.AUTH_SECRET || 'adf54dssd4f56d4ff5ds4ds4f5sd45fds8fd',
	expiry: process.env.AUTH_EXPIRY || '7d',
	saltRounds: 10,
	passwordResetTokenExpiry: 60 * 60,
}
export const SUCCESS = {
	key: 'success',
	registered: 'Welcome onboard',
	login: 'You are logged in, welcome back',
	logout: 'You have logged out, take care.',
	created: 'Resource(s) created successfully!',
	found: 'Resource(s) found!',
	updated: 'Updated successfully!',
	deleted: 'Resource(s) deleted successfully!',
	like: 'Like changed!',
	comment: 'comment added!',
	search: 'Searched!',
	tokenSent: 'Token sent successfully!',
	authenticated: 'Authenticated successfully!',
	passwordChanged: 'Password changed successfully!',
}
export const ERROR = {
	key: 'error',
	SWR: 'Something went wrong  :(',
	userExists: 'User exists. Please choose a different name',
	wrongUsernamePassword: 'Username or password wrong',
	invalidParams: 'Invalid parameters',
	tokenExpired: 'Token expired',
}
export const WARNING = {
	key: 'warning',
	noData: 'No data found.',
	unauthorized: 'Not allowed to access.',
}

export const SCHEMAS = {
	user: 'User',
	blog: 'Article',
	debate: 'Debate',
}

export const ROLES = {
	GUEST: {
		permission: 0,
		label: 'Guest',
	},
	READER: {
		permission: 1,
		label: 'Reader',
	},
	READER_PLUS: {
		permission: 1.1,
		label: 'Reader+',
	},
	MODERATOR: {
		permission: 1.5,
		label: 'Moderator',
	},
	DEBATER: {
		permission: 2,
		label: 'Debater',
	},
	PUBLISHER: {
		permission: 2,
		label: 'Publisher',
	},
	ADMIN: {
		permission: 5,
		label: 'Admin',
	},
}
