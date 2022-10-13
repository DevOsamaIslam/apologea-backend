import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { fetchOneArticleByIdService } from '../read/fetch.service'
import deleteService from './delete.service'
import { IDeleteArticleRequest } from './types'

export default async (req: IDeleteArticleRequest, _res: Response, next: NextFunction) => {
	const articleId = req.params.articleId

	if (!articleId) return next(responses.invalidParams({ articleId }))

	const [article, articleError] = await fetchOneArticleByIdService(articleId)

	if (articleError) return next(responses.ISE(articleError))

	if (!article) return next(responses.notFound())

	const [data, error] = await deleteService(articleId, req.user)

	if (!data) return next(responses.notFound())

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.deleted))
}
