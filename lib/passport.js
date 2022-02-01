import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../models/User.js'
import strings from './strings.js'
import { asyncHandler, isMatch, sanitizeUser } from './utils.js'


const verify = async (username, password, next) => {
	let user = await asyncHandler(User.findOne({
		username
	}).lean())

	// if no user matched
	if(!user) return next(null, false, {message: strings.wrongUsernamePassword})

	if(user.error)
		return next(user.error)

	// if the user exists
	// check the password
	if(!isMatch(password, user.password))
		return next(null, false, {error: strings.wrongUsernamePassword})
	
	next(null, user)
}

const strategy = new Strategy(verify)


passport.use(strategy)

passport.serializeUser((user, next) => {
	next(null, user._id)
})
	
passport.deserializeUser((id, next) => {
	User.findById(id, (err, user) => {
		next(err, sanitizeUser(user._doc))
	})
})

export default passport