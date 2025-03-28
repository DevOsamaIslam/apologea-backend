import { asyncHandler } from 'async-handler-ts'
import mongoose, { Mongoose } from 'mongoose'

type tDatabase = {
	connect: () => Promise<Mongoose | undefined>
	setDebug: (d: boolean) => void
}

const dbConfig: tDatabase = {
	connect: async () => {
		const URL = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/apologea_local'
		const [client, error] = await asyncHandler(mongoose.connect(URL))
		if (error) console.error(error)
		return client
	},
	setDebug: (debug: boolean) => mongoose.set('debug', debug),
}

export default dbConfig
