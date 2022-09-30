import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const id = req.params.id as string

	const data = await asyncHandler(User.findByIdAndDelete(id))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (data.error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted)))
}
