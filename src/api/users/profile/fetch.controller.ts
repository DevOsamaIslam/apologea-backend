import { SUCCESS } from '@constants'
import { asyncHandler, feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '../model/User'
import { fetchManyService } from './fetch.service'
import { IGetPublisherByIdRequest, IGetPublishersRequest } from './types'

export const getPublishers = async (req: IGetPublishersRequest, _res: Response, next: NextFunction) => {
	const paging = req.body.paging

	if (!paging) return next(responses.invalidParams({ paging }))
	const [data, error] = await fetchManyService(req.body.filters, paging)

	if (error) return next(responses.ISE(error))
	if (!data?.length) return next(responses.notFound())

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}

export const getPublisherById = async (req: IGetPublisherByIdRequest, _res: Response, next: NextFunction) => {
	const userId = req.params.userId
	const [data, error] = await asyncHandler(User.findById(userId, 'profile'))

	if (!data) return next(responses.notFound())
	if (error) return next(responses.ISE(error))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
