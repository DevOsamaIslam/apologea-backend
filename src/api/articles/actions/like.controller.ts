import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import likeService from './like.service'

type $body = {
	id: string
	action: 'add' | 'remove'
}

export default async (req: Request<any, any, $body>, _res: Response, next: NextFunction) => {
	const [data, error] = await likeService(req.body.id, req.body.action, req.user!)

	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.like)))
}
