import { AUTH } from '@constants'
import { TJWTPayload } from '@types'
import { UserModel } from 'api/users/model/Users.Model'
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
