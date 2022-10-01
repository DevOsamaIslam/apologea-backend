import { asyncHandler, feedback, returnHandler } from '@helpers'
import { ERROR, SUCCESS, WARNING } from '@constants'
import Article from '../model/Article'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUser } from 'api/users/types'
import deleteService from './delete.service'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const [data, error] = await deleteService(req.body.id, req.user!)

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, data, feedback('warning', WARNING.noData)))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted)))
}
