import User from '../../models/User.js'
import strings from '../../lib/strings.js'
import { asyncHandler, feedback, returnHandler, sanitizeUser } from '../../lib/utils.js'

export default async (req, res, next) => {
	let id = req.query.id
	let data = await asyncHandler( User.findById(id).lean() )

	if(!data)
		return next(returnHandler(404, null, feedback(strings.warning.key, strings.warning.noData)))
	if(data.error)
		return next(returnHandler(404, null, feedback(strings.error.key, strings.error.SWR)))

	return next(returnHandler(200, sanitizeUser(data), feedback(strings.success.key)))

}