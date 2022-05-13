export const auth = {
	method: process.env.AUTH_METHOD || 'jwt',
	secret: process.env.AUTH_SECRET || 'adf54dssd4f56d4ff5ds4ds4f5sd45fds8fd',
	expiry: process.env.AUTH_EXPIRY || '7d',
	saltRounds: 10,
}
