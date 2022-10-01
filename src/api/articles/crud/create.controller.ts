import { asyncHandler, feedback, returnHandler } from '@helpers'
import { ERROR, SUCCESS } from '@constants'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createOne, fakeData } from './create.service'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const [data, error] = await createOne(req.body, req.user!)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.CREATED, data, feedback('success', SUCCESS.created)))
}

export const populateFake = async (req: Request, _res: Response, next: NextFunction) => {
	const [data, error] = await fakeData(req.body.count)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.CREATED, data, feedback('success', SUCCESS.created)))
}
