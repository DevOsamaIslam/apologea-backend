import { ERROR, SUCCESS } from '@constants'
import { asyncHandler, feedback, returnHandler, signJWT } from '@helpers'
import verifyTokenController from './verifyToken.controller'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import { IUser } from 'api/users/types'

type $body = {
	email: string
	token: string
	password: string
	doc: HydratedDocument<IUser>
}

const mainTask = async (
	req: Request<null, null, $body>,
	_res: Response,
	next: NextFunction
) => {
	const password = req.body.password

	// check if the new password exists
	if (!password) {
		return next(
			returnHandler(
				StatusCodes.BAD_REQUEST,
				null,
				feedback('error', ERROR.invalidParams)
			)
		)
	}
	const user: HydratedDocument<IUser> = req.body.doc

	user.auth.password = password
	const result = await asyncHandler(user.save())
	if (result.error) {
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				result.error,
				feedback('error', ERROR.SWR)
			)
		)
	} else {
		// login user
		return next(
			returnHandler(
				StatusCodes.OK,
				{ token: signJWT({ id: user.id }) },
				feedback('success', SUCCESS.passwordChanged)
			)
		)
	}
}

export default [verifyTokenController, mainTask]
