import { ERROR, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getOneArticleService } from '../read/fetch.service'
import { IArticle } from '../types'
import { updateArticleService } from './update.service'

export default async (req: Request<{ articleId: string }, any, Partial<IArticle>>, _res: Response, next: NextFunction) => {
	const [article, articleError] = await getOneArticleService(req.params.articleId)
	// check if we faced an error pulling the article
	if (articleError) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, articleError, feedback('error', ERROR.SWR)))
	// check if we didn't receive a document back
	if (!article) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	// make sure that the one trying to update is the author
	if (article.author.id !== req.user?.id)
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))
	// if we haven't returned, then proceed to update
	const [data, error] = await updateArticleService(req.params.articleId, req.body, req.user!)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	return next(returnHandler(StatusCodes.OK, data))
}
