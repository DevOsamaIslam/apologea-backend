import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import Article from '../../model/Article'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUserProfile } from 'api/users/types'

type $body = {
	filters: IUserProfile
}

export const getAll = async (req: Request<null, null, $body>, _res: Response, next: NextFunction) => {
	const filters: { [x: string]: unknown } = {}
	Object.keys(req.body.filters).forEach((element: string) => {
		filters[`profile.${element}`] = req.body.filters[element as keyof IUserProfile]
	})
	const data = await asyncHandler(Article.find({}).select('-body -comments').populate('author', 'profile.name').limit(10))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (data.error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}

export const getOneById = async (req: Request<{ id: string }>, _res: Response, next: NextFunction) => {
	const id = req.params.id

	const data = await asyncHandler(Article.findById(id).populate('author', 'profile.name').populate('comments.author', 'profile.name'))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

	if (data.error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))

	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
