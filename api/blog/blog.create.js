import strings from '../../lib/strings.js'
import { returnHandler } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let {
		title,
		body,
		excerpt
	} = req.body

	Blog.create({
		title,
		body,
		excerpt,
		author: req.user.id
	})
		.then(data => {
			return next(returnHandler(200, data, strings.successKey))
		})
		.catch(error => {
			return next(returnHandler(500, error, strings.SWR))
		})
}