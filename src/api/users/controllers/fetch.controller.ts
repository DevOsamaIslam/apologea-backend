import { ERROR, SUCCESS, WARNING } from '#lib/constants'
import { asyncHandler, feedback, returnHandler } from '#lib/helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import { IUserProfile, IUser } from '../types'

interface IRequest extends Request {
	body: {
		filters: IUserProfile
	}
}

export default async (req: IRequest, _res: Response, next: NextFunction) => {
	const filters: { [x: string]: unknown } = {}
	Object.keys(req.body.filters).forEach((element: string) => {
		filters[`profile.${element}`] =
			req.body.filters[element as keyof IUserProfile]
	})

	const data: HydratedDocument<IUser> = await asyncHandler(
		User.find(filters, 'profile')
	)

	if (data.length < 1)
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
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found))
	)
}

export const getUserById = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const id = req.params.id as string
	const data = await asyncHandler(User.findById(id, 'profile'))

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
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found))
	)
}
