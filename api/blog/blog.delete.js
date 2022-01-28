import strings from '../../lib/strings.js'
import { asyncHandler } from '../../lib/utils.js'
import Blog from '../../models/Blog.js'


export default async (req, res, next) => {
	let id = req.body.id
	let data = await asyncHandler(
		Blog.findByIdAndRemove(id).lean()
	)

	if(!data) return res.status(404).json({message: strings.noData})
	if(data.error) return res.status(500).json({message: strings.SWR})

	return res.json({message: strings.successKey})
	
}