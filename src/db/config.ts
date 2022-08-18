import { asyncHandler } from '@helpers'
import mongoose, { Mongoose } from 'mongoose'

type tDatabase = {
	connect: () => Promise<Mongoose>
	setDebug: (d: boolean) => void
}

const dbConfig: tDatabase = {
	connect: async () => {
		const URL =
			process.env.DB_CONNECTION_STRING ||
			'mongodb://127.0.0.1:27017/apologea_local'
		const client: Mongoose = await asyncHandler(mongoose.connect(URL))

		return client
	},
	setDebug: (debug: boolean) => mongoose.set('debug', debug),
}

export default dbConfig
