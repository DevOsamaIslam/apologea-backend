import { IUser } from '#/api/users/model/Schema'
import User from '#/api/users/model/User'
import { error, success } from '#lib/constants'
import { asyncHandler, feedback, returnHandler, signJWT } from '#lib/helpers'
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
	const query: query = check.isEmail(identifier)
		? { email: identifier }
		: { username: identifier }

	// check if the credentials are correct
	const user: IUser = await asyncHandler(
		User.findOne(query).select('auth.password')
	)
	// check if the function returned error or nothing
	if (!user) {
		return next(
			returnHandler(
				StatusCodes.UNAUTHORIZED,
				null,
				feedback('error', error.wrongUsernamePassword)
			)
		)
	}
	if (user.error) {
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				user.error,
				feedback('error', error.SWR)
			)
		)
	}
	// if code reached here then we have a match
	// compare passwords
	if (await compare(password, user.auth.password)) {
		return next(
			returnHandler(
				StatusCodes.OK,
				{ token: signJWT({ id: user.id }) },
				feedback('success', success.login)
			)
		)
	}
	// if passwords do not match
	return next(
		returnHandler(
			StatusCodes.UNAUTHORIZED,
			null,
			feedback('error', error.wrongUsernamePassword)
		)
	)
}
