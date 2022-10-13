import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, responses, returnHandler } from '@helpers'
import User from '../../model/Auth'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import check from 'validator'
import { IUser } from 'api/users/model/types'

type $body = {
	email: string
	token: string
	password?: string
	doc: IUser
}

export default async (req: Request<null, null, $body>, _res: Response, next: NextFunction) => {
	const { email, token } = req.body

	// check if email or token don't exist
	if (!check.isEmail(email) || !token) return next(responses.invalidParams({ email, token }))

	// search for a user with the provided email
	const [user, error] = await asyncHandler<HydratedDocument<IUser>>(User.findOne({ 'profile.email': email }, 'auth'))

	// if no user is found
	if (!user) return next(responses.notFound())
	// if there was an error
	if (error) return next(responses.ISE(error))
	// if we have a user
	// then look if they have a reset token
	if (user.auth.reset?.token === token) {
		// if a new password is passed then consider this as a middleware and push to the next
		req.body.doc = user
		if (req.body.password) return next()
		// if we are just verifying, then return
		return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.authenticated)))
	} else {
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.tokenExpired)))
	}
}
