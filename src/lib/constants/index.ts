if (process.env.NODE_ENV !== 'production') {
	console.log('development')
	require('dotenv').config()
} else console.log('production')

export * from './settings'
export * from './auth'
export * from './messages'
