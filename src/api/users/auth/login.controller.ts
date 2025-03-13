import { RequestHandler } from 'express'
import { TLoginPayload } from '../users.schema'
import { loginUser } from './login.service'
import { feedback, returnHandler, signJWT } from '@helpers'
import { StatusCodes } from 'http-status-codes'
import { ERROR, SUCCESS } from '@constants'

export const loginController: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body as TLoginPayload

	const [user, error] = await loginUser({ email, password })

	if (error) {
		return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	}
	if (!user) {
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.wrongUsernamePassword)))
	}

	const payload = {
		token: signJWT({ id: user.id }),
		data: user,
	}

	return next(returnHandler(StatusCodes.OK, payload, feedback('success', SUCCESS.login)))
}
