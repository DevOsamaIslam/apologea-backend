import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import commentService from './comment.service'

type $body = {
	action: 'add' | 'remove'
	comment?: string
	id: string
}

export default async (req: Request<any, any, $body>, res: Response, next: NextFunction) => {
	const action = req.body.action
	const id = req.body.id
	const comment = req.body.comment
	const [data, error] = await commentService(id, action, req.user!, comment)

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	// if we found the article

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated)))
}
