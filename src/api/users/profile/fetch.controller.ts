import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { IPaging } from '@types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { $filter } from 'lib/types/generic'
import User from '../model/User'
import { fetchManyService } from './fetch.service'

export const getPublishers = async (
	req: Request<any, any, { filters: $filter; paging?: IPaging }>,
	_res: Response,
	next: NextFunction,
) => {
	const paging = req.body.paging
	if (!paging) return next(returnHandler(StatusCodes.BAD_REQUEST, { paging }, feedback('error', ERROR.invalidParams)))
	const [data, error] = await fetchManyService(req.body.filters, paging)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	if (!data?.length) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}

export const getPublisherById = async (req: Request, _res: Response, next: NextFunction) => {
	const id = req.params.id as string
	const [data, error] = await asyncHandler(User.findById(id, 'profile'))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
