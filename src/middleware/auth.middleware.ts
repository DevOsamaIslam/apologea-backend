import { AUTH, ERROR } from '@constants'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import passport from 'passport'
import { feedback, returnHandler } from '../lib/helpers'

export const protectedRoute: RequestHandler = (req, res, next) => {
  passport.authenticate(AUTH.method, (error: unknown, user: unknown, info: unknown) => {
    if (!user) return next(returnHandler(StatusCodes.UNAUTHORIZED, info, feedback('error', ERROR.unauthorized)))
    // @ts-expect-error ...
    req.login(user, { session: false })
    return next()
  })(req, res, next)
}
