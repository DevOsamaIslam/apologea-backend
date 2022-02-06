import strings from '../../lib/strings.js'
import { asyncHandler, returnHandler, feedback } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'


export default async (req, res, next) => {
	let id = req.query.id

	let data = await asyncHandler(
		Blog
			.findById(id)
			.populate('author', ['username'])
			.populate('comments.author', ['username'])
			.lean()
	)

	if(!data) return next(returnHandler(404, null, feedback(strings.warning.key, strings.warning.noData))) 
	if(data.error) return next(returnHandler(500, feedback(strings.error.key, strings.error.SWR)))

	return next(returnHandler(200, data, feedback(strings.success.key, strings.success.blogViewed)))
}