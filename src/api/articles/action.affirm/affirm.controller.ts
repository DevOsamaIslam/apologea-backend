import { SUCCESS } from '@constants'
import { feedback, responses, returnHandler } from '@helpers'
import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import affirmService from './affirm.service'
import { IAffirmRequest } from './types'

export default async (req: IAffirmRequest, _res: Response, next: NextFunction) => {
	const articleId = req.body.articleId
	const action = req.body.action
	if (!articleId || !action) return next(responses.invalidParams({ articleId }))
	const loggedinUser = req.user
	const [data, error] = await affirmService(articleId, action, loggedinUser)

	if (error) return next(responses.ISE(error))
	if (!data) return next(responses.notFound())
	return next(responses.success(data, SUCCESS.like))
}
