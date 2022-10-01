import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
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

export const getPublishers = async (req: IRequest, _res: Response, next: NextFunction) => {
	const filters: { [x: string]: unknown } = {}
	Object.keys(req.body.filters).forEach((element: string) => {
		filters[`profile.${element}`] = req.body.filters[element as keyof IUserProfile]
	})

	const [data, error] = await asyncHandler<HydratedDocument<IUser[]>>(User.find(filters, 'profile'))

	if (data.length < 1) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}

export const getPublisherById = async (req: Request, _res: Response, next: NextFunction) => {
	const id = req.params.id as string
	const [data, error] = await asyncHandler(User.findById(id, 'profile'))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found)))
}
