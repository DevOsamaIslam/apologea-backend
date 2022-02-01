import passport from 'passport'
import strings from '../../lib/strings.js'
import { returnHandler } from '../../lib/utils.js'

export default async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err) return next(returnHandler(500, err, strings.SWR))
		if (info) return next(returnHandler(401, info, strings.unauthorized))
		req.logIn(user, err => {
			if (err) { return next(err) }
			return next(returnHandler(200, {isAuthed: true, user}, strings.successKey))
		})
	})(req, res, next)
}