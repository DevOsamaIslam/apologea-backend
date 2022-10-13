import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, responses, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const id = req.params.id as string

	const [data, error] = await asyncHandler(User.findByIdAndDelete(id))

	if (error) return next(responses.ISE(error))

	if (!data) return next(responses.notFound())

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted)))
}
