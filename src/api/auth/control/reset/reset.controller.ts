import { ERROR, SUCCESS } from '@constants'
import { asyncHandler, feedback, responses, returnHandler, signJWT } from '@helpers'
import verifyTokenController from './verifyToken.controller'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import { IUser } from 'api/users/model/types'

type $body = {
	email: string
	token: string
	password: string
	doc: HydratedDocument<IUser>
}

const mainTask = async (req: Request<null, null, $body>, _res: Response, next: NextFunction) => {
	const password = req.body.password

	// check if the new password exists
	if (!password) {
		return next(responses.invalidParams({ password }))
	}
	const user: HydratedDocument<IUser> = req.body.doc

	user.auth.password = password
	const [_, error] = await asyncHandler(user.save())
	if (error) {
		return next(responses.ISE(error))
	} else {
		// login user
		return next(responses.success({ token: signJWT({ id: user.id }) }, SUCCESS.passwordChanged))
	}
}

export default [verifyTokenController, mainTask]
