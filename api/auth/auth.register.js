import User from '../../models/User.js'
import strings from '../../config/strings.js'

export default async (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
		.then(data => res.json({
			account: data._id,
			message: strings.successKey
		}))
		.catch(error => res.json(error))
}