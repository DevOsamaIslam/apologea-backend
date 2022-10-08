import { createUser } from 'api/auth/model/Auth'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { AUTH, ERROR, SUCCESS } from '@constants'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { registerService } from './register.service'

export default async (req: Request, res: Response, next: NextFunction) => {
	const [data, error] = await registerService(req.body)
	if (data)
		return next(
			returnHandler(
				StatusCodes.CREATED,
				{
					token: sign({ id: data.id }, AUTH.secret, {
						expiresIn: AUTH.expiry,
					}),
				},
				feedback('success', SUCCESS.registered),
			),
		)
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
}
