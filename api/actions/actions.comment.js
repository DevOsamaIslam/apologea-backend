import Blog from '../../models/Blog.js'
import strings from '../../lib/strings.js'
import mongoose from 'mongoose'
import { returnHandler } from '../../lib/utils.js'

export default (req, res, next) => {
	let {
		id,
		action,
		comment
	} = req.body
	action = action === 'add' ? {
		$push: {
			comments: {
				comment,
				author: req.user.id
			}
		}
	} : {
		$pull: {
			comments: { 
				_id: mongoose.Types.ObjectId(comment),
				author: req.user.id
			}
		}
	}
	Blog.findByIdAndUpdate(
		id,
		action,
		{ new: true },
		(err, data) => {
			if(err) return next(returnHandler(500, err, strings.SWR))
			return next(returnHandler(200, data, strings.successKey))
		}
	)
}