import { AUTH, ROLES, ERROR } from '@constants'
import { returnHandler, feedback } from '@helpers'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import passport from 'passport'

export const protectedRoute = passport.authenticate(AUTH.method, {
	session: false,
})

export const permissioned = (permission: number) => (req: Request, _res: Response, next: NextFunction) => {
	const auth = req.user?.auth
	const role = ROLES[(auth?.role.toUpperCase() as keyof typeof ROLES) || 'ADMIN'] as typeof ROLES.ADMIN
	if (role.permission >= permission) {
		next()
	} else {
		next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.SWR)))
	}
}
