import User from '../../models/User.js'
import strings from '../../lib/strings.js'
import { asyncHandler, sanitizeUser } from '../../lib/utils.js'

export default async (req, res, next) => {
	let id = req.params.id
	let data = await asyncHandler( User.findById(id).lean() )

	if(!data || data.message === strings.errorKey)
		return res.status(404).json({ message: 'no user found' })
	
	return res.json(sanitizeUser(data))

}