import strings from '../../lib/strings.js'
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
			if(err) return res.status(500).json({message: strings.SWR})
			if(!data) return res.status(404).json({message: strings.noData})
			return res.json(data)
		})		
}