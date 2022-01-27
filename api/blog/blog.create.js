import strings from '../../lib/strings.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let {
		title,
		body
	} = req.body

	Blog.create({
		title,
		body,
		author: req.user.id
	})
		.then(data => {
			return res.json({
				message: strings.successKey,
				blog: data
			})
		})
		.catch(error => {
			return res.status(500).json(error)
		})
}