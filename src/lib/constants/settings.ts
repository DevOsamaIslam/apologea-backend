export const SERVER_ADDRESS = `${process.env.HOST}:${process.env.PORT}`
export const BASE_PATH = '/api/'
export const CLIENT_ADDRESS = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

export const SCHEMAS = {
	user: 'User',
	blog: 'Article',
	debate: 'Debate',
}
