import { returnHandler, sanitizeUser } from '../../lib/utils.js'

export default (req, res, next) => {
	if(req.isAuthenticated())
		next(returnHandler(200, {
			isAuthed: true,
			user: sanitizeUser(req.user)
		}))
	else next(returnHandler(200, {
		isAuthed: false
	}))
}