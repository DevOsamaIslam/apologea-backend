import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { IUser } from 'api/users/types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Article from '../../model/Article'

type $body = {
	id: string
	action: 'add' | 'remove'
}

export default async (req: Request<any, any, $body>, _res: Response, next: NextFunction) => {
	const action = req.body.action === 'add' ? '$addToSet' : '$pull'
	const data = await asyncHandler(
		Article.findByIdAndUpdate(
			req.body.id,
			{
				[action]: {
					likes: req.user?.id,
				},
			},
			{ new: true },
		),
	)
	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (data.error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.like)))
}
