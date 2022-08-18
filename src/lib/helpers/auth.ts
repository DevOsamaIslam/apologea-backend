import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { feedback, returnHandler } from './response'
import { StatusCodes } from 'http-status-codes'
import { AUTH, ERROR } from '@constants'

export const signJWT = (payload: JwtPayload): string => {
	return jwt.sign(payload, AUTH.secret)
}

export const protectedRoute = passport.authenticate(AUTH.method, {
	session: false,
})

export const permissioned =
	(permission: number) =>
	(req: Request, _res: Response, next: NextFunction) => {
		const auth = req.user?.auth
		// @ts-ignore
		const role: typeof ROLES.ADMIN = ROLES[auth?.role.toUpperCase() || 'ADMIN']
		if (role.permission >= permission) {
			return next()
		} else {
			return next(
				returnHandler(
					StatusCodes.UNAUTHORIZED,
					null,
					feedback('error', ERROR.SWR)
				)
			)
		}
	}
