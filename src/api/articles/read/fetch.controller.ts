import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { IPaging } from '@types'
import { IUserProfile } from 'api/users/types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { fetchArticlesService, getOneArticleService } from './fetch.service'

type $body = {
	filters: Partial<IUserProfile>
	paging: IPaging
}

export const getAll = async (req: Request<null, null, $body>, _res: Response, next: NextFunction): Promise<void> => {
	const [data, error] = await fetchArticlesService(req.body.filters, req.body.paging)

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}

export const getOneById = async (req: Request<{ id: string }>, _res: Response, next: NextFunction) => {
	const [data, error] = await getOneArticleService(req.params.id)

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
