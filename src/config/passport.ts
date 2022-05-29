import User from '#/api/users/model/User'
import { AUTH } from '#lib/constants'
import { asyncHandler } from '#lib/helpers'
import { $jwtPayload } from '#lib/types'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback, VerifyCallback } from 'passport-jwt'

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: AUTH.secret,
}

const jwtStrategy: VerifyCallback = async (
	payload: $jwtPayload,
	done: VerifiedCallback
) => {
	const user = await asyncHandler(User.findById(payload.id))
	if (!user) return done(null, false)
	if (user.error) return done(user.error, false)
	return done(null, user)
}

export default (passport: PassportStatic) => {
	passport.use(new Strategy(options, jwtStrategy))
}
