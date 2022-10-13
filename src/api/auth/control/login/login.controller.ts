import User from 'api/users/model/User'
import { IUser, IUserDocument } from 'api/users/model/types'
import { ERROR, SUCCESS } from '@constants'
import { asyncHandler, feedback, responses, returnHandler, signJWT } from '@helpers'
import { compare } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import check from 'validator'

type body = {
	identifier: string
	password: string
}

type query = {
	username?: string
	email?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const { identifier, password }: body = req.body
	const query: query = check.isEmail(identifier) ? { email: identifier } : { username: identifier }

	// check if the credentials are correct
	const [user, error] = await asyncHandler<IUserDocument>(User.findOne(query).select('auth.password'))
	// check if the function returned error or nothing
	if (!user) {
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.wrongUsernamePassword)))
	}
	if (error) {
		return next(responses.ISE(error))
	}
	// if code reached here then we have a match
	// compare passwords
	if (await compare(password, user.auth.password)) {
		return next(returnHandler(StatusCodes.OK, { token: signJWT({ id: user.id }) }, feedback('success', SUCCESS.login)))
	}
	// if passwords do not match
	return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.wrongUsernamePassword)))
}
