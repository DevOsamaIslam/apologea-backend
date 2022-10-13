import { ERROR, WARNING } from '@constants'
import { feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { fetchOneArticleByIdService } from '../read/fetch.service'
import { IArticle } from '../model/types'
import { updateArticleService } from './update.service'
import { IUpdateArticleRequest } from './types'

export default async (req: IUpdateArticleRequest, _res: Response, next: NextFunction) => {
	const articleId = req.params.articleId
	const patch = req.body
	if (!articleId || !Object.keys(patch).length) return next(responses.invalidParams({ articleId, patch }))

	const [article, articleError] = await fetchOneArticleByIdService(articleId)
	// check if we faced an error pulling the article
	if (articleError) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, articleError, feedback('error', ERROR.SWR)))
	// check if we didn't receive a document back
	if (!article) return next(responses.notFound())
	// make sure that the one trying to update is the author
	if (article.author.id !== req.user.id)
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))
	// if we haven't returned, then proceed to update
	const [data, error] = await updateArticleService(articleId, patch, req.user)

	if (error) return next(responses.ISE(error))

	if (!data) return next(responses.notFound())

	return next(returnHandler(StatusCodes.OK, data))
}
