export const SERVER_ADDRESS = `${process.env.HOST}:${process.env.PORT}`
export const BASE_PATH = '/api/'
export const CLIENT_ADDRESS = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
export const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
export const MAX_FILE_SIZE = 50 * 1024 * 1024

export const MIN_TITLE_LENGTH = 5
export const MAX_TITLE_LENGTH = 100
export const MAX_EXCERPT_LENGTH = 400
export const MAX_DESCRIPTION_LENGTH = 1000
