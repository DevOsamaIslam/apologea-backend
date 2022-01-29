import strings from '../../lib/strings.js'
import { returnHandler } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let action = req.body.action === 'add' ? '$addToSet' : '$pull'
	Blog.findByIdAndUpdate(
		req.body.id, 
		{
			[action]: {
				affirms: req.user.id
			}
		},
		{ new: true },
		(err, data) => {
			if(err) return next(returnHandler(500, err, strings.SWR))
			if(!data) return next(returnHandler(404, null, strings.noData))
			return next(returnHandler(200, data, strings.successKey))
		})		


	
}