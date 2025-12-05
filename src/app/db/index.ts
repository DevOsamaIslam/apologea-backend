import { asyncHandler } from 'async-handler-ts'
import mongoose, { Mongoose, ObjectId, Schema } from 'mongoose'

type TDatabase = {
  connect: () => Promise<Mongoose | null>
  setDebug: (d: boolean) => void
}

const dbConfig: TDatabase = {
  connect: async () => {
    const URL = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/apologea_local'
    const [client, error] = await asyncHandler(mongoose.connect(URL))
    if (error) console.error(error)
    return client
  },
  setDebug: (debug: boolean) => mongoose.set('debug', debug),
}

export default dbConfig

export const addId2schemas = (schema: Schema) => {
  schema.virtual('id').get(function () {
    return (this._id as ObjectId).toString()
  })
}
