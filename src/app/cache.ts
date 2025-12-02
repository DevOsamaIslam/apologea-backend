import { asyncHandler } from 'async-handler-ts'
import { Mongoose } from 'mongoose'
import * as redis from 'redis'

const client = redis.createClient({ url: '' })

export const hookCache = async (dbClient: Mongoose) => {
  const exec = dbClient.Query.prototype.exec
  const [, err] = await asyncHandler(client.connect())

  if (err) throw new Error(err.message)

  dbClient.Query.prototype.exec = async function () {
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { _collection: this.model.collection.name }))

    const cachedData = await client.get(key)

    if (cachedData) {
      console.log('cached data returned')
      return JSON.parse(cachedData)
    }
    // client.flushAll()
    const result = await exec.apply(this)
    client.set(key, JSON.stringify(result))
    console.log('fresh data returned and stored in the freezer')
    return result
  }
}
