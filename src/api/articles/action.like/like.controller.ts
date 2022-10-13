import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import likeService from './like.service'
import { ILikeRequest } from './types'

export default async (req: ILikeRequest, _res: Response, next: NextFunction) => {
	const articleId = req.body.articleId
	const action = req.body.action
	if (!articleId || !action) return next(responses.missingFields())

	const [data, error] = await likeService(articleId, action, req.user)

	if (error) return next(responses.ISE(error))

	if (!data) return next(responses.notFound())

	return next(responses.success(data, SUCCESS.like))
}
