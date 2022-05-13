import { error, success, warning } from '#lib/constants'
import { asyncHandler, feedback, returnHandler } from '#lib/helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Blog from '../../model/Blog'

export default async (
	req: Request<null, null, null, { term: string }>,
	_res: Response,
	next: NextFunction
) => {
	const term: string = req.query.term
	const data = await asyncHandler(
		Blog.find({
			$text: { $search: term },
		})
			.select('-body -comments')
			.populate('author', 'profile.name')
	)
	if (!data)
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				null,
				feedback('warning', warning.noData)
			)
		)
	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', error.SWR)
			)
		)
	return next(
		returnHandler(StatusCodes.OK, data, feedback('success', success.search))
	)
}
