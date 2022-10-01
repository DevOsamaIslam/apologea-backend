import User from 'api/users/model/User'
import { IUser } from 'api/users/types'
import { asyncHandler, feedback, getCode, returnHandler } from '@helpers'
import { ERROR, SUCCESS, WARNING } from '@constants'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'

interface IRequest extends Request {
	body: {
		email: string
	}
}

export default async (req: IRequest, _res: Response, next: NextFunction) => {
	const email = req.body.email
	// find if we have a user with that email
	const [user, error] = await asyncHandler<HydratedDocument<IUser>>(User.findOne({ 'profile.email': email }, 'auth'))

	// if no user found with that email
	if (!user) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	// if the query returned an error
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	// if user found
	// create a password reset token
	const token = getCode
	user.auth.reset = { token }
	user.save()
	// return the code
	return next(returnHandler(StatusCodes.OK, token, feedback('success', SUCCESS.tokenSent)))
}
