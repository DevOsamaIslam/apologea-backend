import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, responses, returnHandler } from '@helpers'
import { IPaging } from '@types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { searchService } from './search.service'

export default async (req: Request<null, null, { term: string; paging?: IPaging }>, _res: Response, next: NextFunction) => {
	const [data, error] = await searchService(req.body.term, req.body.paging)
	if (!data) return next(responses.notFound())

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.search))
}
