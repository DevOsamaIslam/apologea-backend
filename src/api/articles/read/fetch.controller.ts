import { SUCCESS } from '@constants'
import { responses } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { fetchArticlesService, fetchOneArticleByIdService, fetchTopArticlesService } from './fetch.service'
import { IFetchAllRequest, IFetchOneRequest } from './types'

export const fetchAllArticlesController = async (req: IFetchAllRequest, _res: Response, next: NextFunction): Promise<void> => {
	const [data, error] = await fetchArticlesService(req.body.filters, req.body.paging)

	if (!data) return next(responses.notFound([]))

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.found))
}

export const fetchOneArticleByIdController = async (req: IFetchOneRequest, _res: Response, next: NextFunction) => {
	const articleId = req.params.articleId
	if (!articleId) return next(responses.invalidParams({ articleId }))
	const [data, error] = await fetchOneArticleByIdService(articleId)

	if (!data) return next(responses.notFound([]))

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.found))
}

export const fetchTopArticlesController = async (req: Request, _res: Response, next: NextFunction) => {
	const loggedinUser = req.user

	const [data, error] = await fetchTopArticlesService()

	if (!data) return next(responses.notFound([]))

	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.found))
}
