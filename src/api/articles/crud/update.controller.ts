import { ERROR, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { updateArticleService } from './update.service'

type body = {
	id: string
	title: string
	body: string
	visible: boolean
	authorId: string
}

export default async (req: Request<any, any, body>, _res: Response, next: NextFunction) => {
	if (req.body.authorId !== req.user?.id)
		return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('warning', WARNING.unauthorized)))

	const [data, error] = await updateArticleService(req.body, req.user!)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	return next(returnHandler(StatusCodes.OK, data))
}
