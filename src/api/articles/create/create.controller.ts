import { asyncHandler, feedback, responses, returnHandler } from '@helpers'
import { ERROR, SUCCESS } from '@constants'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createOne, fakeData } from './create.service'
import { ICreateArticleRequest } from './types'

export default async (req: ICreateArticleRequest, _res: Response, next: NextFunction) => {
	const { title, body } = req.body
	if (!title || !body) return next(responses.missingFields({ title, body }))

	const [data, error] = await createOne(req.body, req.user)

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.created))
}

export const populateFake = async (req: Request, _res: Response, next: NextFunction) => {
	const count = parseInt(req.params.count)

	const [data, error] = await fakeData(req.user, count)

	if (error) return next(responses.ISE(error))

	return next(responses.created(data))
}
