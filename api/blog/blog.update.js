import strings from '../../lib/strings.js'
import { returnHandler } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let {
		id,
		title,
		body,
		visible
	} = req.body


	Blog.findById(id, (err, data) => {
		if(!data) return next(returnHandler(404, null, strings.noData))
		if(data.error) return next(returnHandler(500, err, strings.SWR))

		let author = data.author.toString()
		if(author !== req.user.id) return next(returnHandler(401, null, strings.unauthorized))
		data.title = title || data.title
		data.body = body || data.body
		data.visible = visible || data.visible
		data.save()
		return next(returnHandler(200, data, strings.successKey))
	})

}