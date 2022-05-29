import { IUser } from '#/api/users/model/Schema'
import { ERROR, SUCCESS, WARNING } from '#lib/constants'
import { asyncHandler, feedback, returnHandler } from '#lib/helpers'
import User from '../../model/Auth'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import check from 'validator'

type $body = {
	email: string
	token: string
	password?: string
	doc: IUser
}

export default async (
	req: Request<null, null, $body>,
	_res: Response,
	next: NextFunction
) => {
	const { email, token } = req.body

	// check if email or token don't exist
	if (!check.isEmail(email) || !token)
		return next(
			returnHandler(
				StatusCodes.BAD_REQUEST,
				null,
				feedback('error', ERROR.invalidParams)
			)
		)

	// search for a user with the provided email
	const user: HydratedDocument<IUser> = await asyncHandler(
		User.findOne({ 'profile.email': email }, 'auth')
	)

	// if no user is found
	if (!user)
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				null,
				feedback('warning', WARNING.noData)
			)
		)
	// if there was an error
	if (user.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				user.error,
				feedback('error', ERROR.SWR)
			)
		)
	// if we have a user
	// then look if they have a reset token
	if (user.auth.reset?.token === token) {
		// if a new password is passed then consider this as a middleware and push to the next
		req.body.doc = user
		if (req.body.password) return next()
		// if we are just verifying, then return
		return next(
			returnHandler(
				StatusCodes.OK,
				null,
				feedback('success', SUCCESS.authenticated)
			)
		)
	} else {
		return next(
			returnHandler(
				StatusCodes.UNAUTHORIZED,
				null,
				feedback('error', ERROR.tokenExpired)
			)
		)
	}
}
