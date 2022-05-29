import { IUser } from '#/api/users/model/Schema'
import { ERROR, SUCCESS, WARNING } from '#lib/constants'
import {
	asyncHandler,
	feedback,
	protectedRoute,
	returnHandler,
} from '../../../../lib/helpers'
import Blog from '../../model/Blog'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface IRequest extends Request {
	user: IUser
	body: {
		id: string
		action: 'add' | 'remove'
	}
}

const mainTask = async (req: IRequest, _res: Response, next: NextFunction) => {
	const action = req.body.action === 'add' ? '$addToSet' : '$pull'
	const data = await asyncHandler(
		Blog.findByIdAndUpdate(
			req.body.id,
			{
				[action]: {
					likes: req.user.id,
				},
			},
			{ new: true }
		)
	)
	if (!data)
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				null,
				feedback('warning', WARNING.noData)
			)
		)
	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)
	return next(
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.like))
	)
}

export default [protectedRoute, mainTask]
