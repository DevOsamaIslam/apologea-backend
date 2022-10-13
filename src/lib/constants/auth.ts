import { $role } from 'lib/types/generic'

export const AUTH = {
	method: process.env.AUTH_METHOD || 'jwt',
	secret: process.env.AUTH_SECRET || 'adf54dssd4f56d4ff5ds4ds4f5sd45fds8fd',
	expiry: process.env.AUTH_EXPIRY || '7d',
	saltRounds: 10,
	passwordResetTokenExpiry: 60 * 60,
}

export const ROLES: $role = {
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
