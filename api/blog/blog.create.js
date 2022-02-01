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
		.then(async data => {
			data = await data.populate('author', ['username'])
			return next(returnHandler(200, data._doc))
		})
		.catch(error => {
			return next(returnHandler(500, error, strings.SWR))
		})
}