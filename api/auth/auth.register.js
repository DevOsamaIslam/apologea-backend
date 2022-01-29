import User from '../../models/User.js'
import strings from '../../lib/strings.js'
import { returnHandler } from '../../lib/utils.js'

export default async (req, res, next) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
		.then(data => {
			return next(returnHandler(200, data._id, strings.successKey))
		})
		.catch(error => {
			next(returnHandler(500, error, strings.SWR))
		})
}