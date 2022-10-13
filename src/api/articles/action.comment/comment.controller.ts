import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import commentService from './comment.service'
import { ICommentRequest } from './types'

export default async (req: ICommentRequest, res: Response, next: NextFunction) => {
	const action = req.body.action
	const articleId = req.body.articleId
	const comment = req.body.comment
	if (!action || !articleId || !comment) return next(responses.missingFields(req.body))

	const [data, error] = await commentService(articleId, action, req.user, comment)

	if (!data) return next(responses.notFound())
	if (error) return next(responses.ISE(error))

	return next(responses.success(data, SUCCESS.updated))
}
