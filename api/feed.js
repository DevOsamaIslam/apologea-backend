import strings from '../lib/strings.js'
import { asyncHandler, returnHandler } from '../lib/utils.js'
import Blog from '../models/Blog.js'

export default  async(req, res, next) => {
	let data = await asyncHandler(
		Blog.find({}).select('-body').populate('author', 'username').limit(10).lean()
	)
	if(!data) return next(returnHandler(404, null, strings.noData))
	if(data.error) return next(returnHandler(500, data.error, strings.SWR))
	return res.json(data)
}