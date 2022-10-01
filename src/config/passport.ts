import User from 'api/users/model/User'
import { AUTH } from '@constants'
import { asyncHandler } from '@helpers'
import { $jwtPayload } from '@types'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback, VerifyCallback } from 'passport-jwt'

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: AUTH.secret,
}

const jwtStrategy: VerifyCallback = async (payload: $jwtPayload, done: VerifiedCallback) => {
	const [user, error] = await asyncHandler(User.findById(payload.id))
	if (error) return done(error, false)
	if (!user) return done(null, false)
	return done(null, user)
}

export default (passport: PassportStatic) => {
	passport.use(new Strategy(options, jwtStrategy))
}
