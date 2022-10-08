if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
console.log(process.env.NODE_ENV)

export * from './settings'
export * from './auth'
export * from './messages'
export * from './request'
