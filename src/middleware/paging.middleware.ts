import { DEFAULT_PAGE, PAGE_LIMIT } from '@constants'
import { Mongoose } from 'mongoose'

export default (mongoose: Mongoose) =>
	(mongoose.Query.prototype.paging = function (options) {
		const page = options?.page || DEFAULT_PAGE
		const limit = options?.limit || PAGE_LIMIT
		const skip = (page - 1) * limit
		this.skip(skip).limit(options?.limit || PAGE_LIMIT)
		return this
	})
