import {
	asyncHandler,
	feedback,
	permissioned,
	protectedRoute,
	returnHandler,
} from '#helpers'
import { ERROR, SUCCESS, WARNING } from '#lib/constants'
import Article from '../../model/Article'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUser } from '#/api/users/types'

type body = {
	id: string
}

const mainTask = async (
	req: Request<null, null, body>,
	_res: Response,
	next: NextFunction
) => {
	const user = req.user as IUser
	const id = req.body.id

	const data = await asyncHandler(
		Article.deleteOne({
			_id: id,
			author: user.id,
		})
	)

	if (!data) {
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				data,
				feedback('warning', WARNING.noData)
			)
		)
	}

	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)

	return next(
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.deleted))
	)
}

export default [protectedRoute, permissioned(2), mainTask]
