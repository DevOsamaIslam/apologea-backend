import { AUTH, ERROR, ROLES } from '@constants'
import { returnHandler, feedback, responses } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import passport from 'passport'

export const protectedRoute = (req: Request, _res: Response, next: NextFunction) => {
	passport.authenticate(AUTH.method, (error, user, info) => {
		if (error) return next(responses.ISE(error))
		if (!user) return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))
		req.user = user
		next()
	})(req, _res, next)
}

export const permissioned = (permission: number) => (req: Request, _res: Response, next: NextFunction) => {
	const auth = req.user?.auth
	const role = ROLES[(auth?.role.toUpperCase() as keyof typeof ROLES) || 'ADMIN'] as typeof ROLES.ADMIN
	if (role.permission >= permission) {
		next()
	} else {
		next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))
	}
}
