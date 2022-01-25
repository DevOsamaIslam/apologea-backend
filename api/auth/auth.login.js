import passport from 'passport'
import strings from '../../config/strings.js'

export default async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err) return next(err)
		if (info) return res.status(401).json(info)
		req.logIn(user, err => {
			if (err) { return next(err) }
			return res.json({
				account: req.user,
				message: info || strings.successKey
			})
		})
	})(req, res, next)
}