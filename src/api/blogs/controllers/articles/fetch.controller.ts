import { error, success, warning } from '#lib/constants'
import {
	asyncHandler,
	returnHandler,
	feedback,
	protectedRoute,
} from '#lib/helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Blog from '../../model/Blog'

export const getAll = async (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	const data = await asyncHandler(
		Blog.find({})
			.select('-body -comments')
			.populate('author', 'profile.name')
			.limit(10)
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
		returnHandler(StatusCodes.OK, data, feedback('success', success.blogsFound))
	)
}

const _getOneById = async (
	req: Request<{ id: string }>,
	_res: Response,
	next: NextFunction
) => {
	const id = req.params.id

	const data = await asyncHandler(
		Blog.findById(id)
			.populate('author', 'profile.name')
			.populate('comments.author', 'profile.name')
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
		returnHandler(StatusCodes.OK, data, feedback('success', success.blogFound))
	)
}

export const getOneById = [protectedRoute, _getOneById]
