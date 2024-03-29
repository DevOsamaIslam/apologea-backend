import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { searchService } from './search.service'

export default async (req: Request<null, null, null, { term: string }>, _res: Response, next: NextFunction) => {
	const [data, error] = await searchService(req.query.term)
	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.search)))
}
