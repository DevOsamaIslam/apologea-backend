import { createUser } from 'api/auth/model/Auth'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { AUTH, ERROR, SUCCESS } from '@constants'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
	console.log({ request: req.body })

	const data = await asyncHandler(
		createUser({
			username: req.body.username as string,
			email: req.body.email as string,
			password: req.body.password as string,
		})
	)
	if (data)
		return next(
			returnHandler(
				StatusCodes.CREATED,
				{
					token: sign({ id: data.id }, AUTH.secret, {
						expiresIn: AUTH.expiry,
					}),
				},
				feedback('success', SUCCESS.registered)
			)
		)
	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)
}
