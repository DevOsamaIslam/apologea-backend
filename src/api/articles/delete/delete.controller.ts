import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getOneArticleService } from '../read/fetch.service'
import deleteService from './delete.service'

export default async (req: Request<{ articleId?: string }>, _res: Response, next: NextFunction) => {
	const articleId = req.params.articleId

	if (!articleId) return next(returnHandler(StatusCodes.BAD_REQUEST, null, feedback('error', ERROR.invalidParams)))

	const [article, articleError] = await getOneArticleService(articleId)

	if (articleError) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, articleError, feedback('error', ERROR.SWR)))

	if (!article) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (article.author?.id !== req.user!.id)
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))

	const [data, error] = await deleteService(articleId, req.user!)

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, data, feedback('warning', WARNING.noData)))

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted)))
}
