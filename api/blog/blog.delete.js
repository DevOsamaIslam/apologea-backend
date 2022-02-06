import strings from '../../lib/strings.js'
import { asyncHandler, feedback, returnHandler } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'


export default async (req, res, next) => {
	let id = req.body.id
	let data = await asyncHandler(
		Blog.deleteOne({
			_id: id,
			author: req.user.id
		}).lean()
	)

	if(!data) return next(returnHandler(404, null, strings.noData))
	if(data.error) return next(returnHandler(500, data.error, strings.SWR))

	return next(returnHandler(200, null, feedback(strings.success.key, strings.blog.blogDeleted)))
	
}