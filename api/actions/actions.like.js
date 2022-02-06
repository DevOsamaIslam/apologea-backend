import strings from '../../lib/strings.js'
import { returnHandler, feedback } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let action = req.body.action === 'add' ? '$addToSet' : '$pull'
	Blog.findByIdAndUpdate(
		req.body.id, 
		{
			[action]: {
				likes: req.user.id
			}
		},
		{ new: true },
		(err, data) => {
			if(err) return next(returnHandler(500, err, feedback(strings.error.key, strings.error.SWR)))
			if(!data) return next(returnHandler(404, null, feedback(strings.warning.key, strings.warning.noData)))
			return next(returnHandler(200, null, feedback(strings.success.key, strings.success.like)))
		})		
}