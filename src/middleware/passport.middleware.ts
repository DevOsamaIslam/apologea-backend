import { UserModel } from 'api/users/model/User.Model'
import { AUTH } from '../lib/constants'
import { TJWTPayload } from '../lib/types'
import { asyncHandler } from 'async-handler-ts'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback, VerifyCallback } from 'passport-jwt'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH.secret,
}

const jwtStrategy: VerifyCallback = async (payload: TJWTPayload, done: VerifiedCallback) => {
  const [user, error] = await asyncHandler(UserModel.findById(payload.id).exec())
  if (error) return done(error, false)
  if (!user) return done(null, false)
  return done(null, user)
}

export default (passport: PassportStatic) => {
  passport.use(new Strategy(options, jwtStrategy))
}
