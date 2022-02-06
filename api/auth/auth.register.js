import User from '../../models/User.js'
import strings from '../../lib/strings.js'
import { feedback, returnHandler } from '../../lib/utils.js'

export default async (req, res, next) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
		.then(data => {
			return next(returnHandler(200, data.id, feedback(strings.success.key, strings.success.registered)))
		})
		.catch(error => {
			return next(returnHandler(500, error, feedback(strings.error.key, strings.error.SWR)))
		})
}