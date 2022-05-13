import {
	Strategy,
	ExtractJwt,
	VerifiedCallback,
	VerifyCallback,
	StrategyOptions,
} from 'passport-jwt'
import { PassportStatic } from 'passport'
import User from '#/api/users/model/User'
import { $jwtPayload } from '#lib/types'
import { asyncHandler } from '#lib/helpers'

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.AUTH_SECRET,
}

const jwtStrategy: VerifyCallback = async (
	payload: $jwtPayload,
	done: VerifiedCallback
) => {
	const user = await asyncHandler(User.findById(payload.id))
	if (user.error) return done(user.error, false)
	if (!user) return done(null, false)
	return done(null, user)
}

export default (passport: PassportStatic) =>
	passport.use(new Strategy(options, jwtStrategy))
