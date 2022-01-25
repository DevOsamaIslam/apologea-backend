import User from '../../models/User.js'
import { asyncHandler } from '../../config/utils.js'

export default async (req, res) => {
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
		.then(data => res.json(data))
		.catch(error => res.json(error))
}