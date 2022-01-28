import bcrypt from 'bcryptjs'

export const authed = (req, res, next) => {
	if(req.isAuthenticated()) next()
	else return res.status(401).send()
}

export const asyncHandler = async fn => {
	try {
		let result = await fn
		return result
	} catch (error) {
		return { error } 
	}
}

export const isMatch = (plain, hashed) => {
	return bcrypt.compareSync(plain, hashed)
}

export const sanitizeUser = user => {
	user.password = undefined
	user.salt = undefined
	return user
}

export default {}
