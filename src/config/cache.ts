import { CACHE_EXPIRY, REDIS_URL } from '@constants'
import { asyncHandler } from '@helpers'
import { RedisClientType } from '@redis/client'
import { Mongoose } from 'mongoose'
import { createClient } from 'redis'

export const useCache = async (mongoose: Mongoose) => {
	const exec = mongoose.Query.prototype.exec
	const redis = createClient({ url: REDIS_URL })
	const [, error] = await asyncHandler<RedisClientType>(redis.connect())
	if (error) throw new Error(error.message)

	mongoose.Query.prototype.cache = function (options) {
		this.useCache = true
		this.expiry = options?.expiry || CACHE_EXPIRY

		return this
	}

	mongoose.Query.prototype.exec = async function () {
		if (!this.useCache) {
			console.log('fresh data')
			return exec.apply(this)
		}
		const key = JSON.stringify(
			Object.assign({}, this.getQuery(), {
				collection: this.model.collection.name,
			}),
		)
		const [cachedData] = await asyncHandler<string>(redis.get(key))
		if (cachedData) {
			const doc = JSON.parse(cachedData)
			console.log('from the cache')
			return Array.isArray(doc) ? doc.map(_doc => new this.model(_doc)) : new this.model(doc)
		}
		const [result] = await asyncHandler(exec.apply(this))
		if (result) {
			console.log('caching...')
			redis.set(key, JSON.stringify(result))
		}
		return result
	}
}
