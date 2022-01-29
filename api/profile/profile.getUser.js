import User from '../../models/User.js'
import strings from '../../lib/strings.js'
import { asyncHandler, returnHandler, sanitizeUser } from '../../lib/utils.js'

export default async (req, res, next) => {
	let id = req.params.id
	let data = await asyncHandler( User.findById(id).lean() )

	if(!data || data.message === strings.errorKey)
		return next(returnHandler(404, null, strings.noData))
	
	return next(returnHandler(200, sanitizeUser(data), strings.successKey))

}