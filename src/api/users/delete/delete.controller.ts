import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const id = req.params.id as string

	const [data, error] = await asyncHandler(User.findByIdAndDelete(id))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted)))
}
