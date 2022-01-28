import strings from '../../lib/strings.js'
import Blog from '../../models/Blog.js'

export default (req, res, next) => {
	let {
		id,
		title,
		body,
		visible
	} = req.body


	Blog.findById(id, (err, data) => {
		if(!data) return res.status(404).json(strings.noData)
		if(data.error) return res.status(500).json(strings.SWR)

		let author = data.author.toString()
		if(author !== req.user.id) return res.status(401).send()
		data
		data.title = title || data.title
		data.body = body || data.body
		data.visible = visible || data.visible
		data.save()
		return res.json({data, messgage: strings.successKey})
	})

}