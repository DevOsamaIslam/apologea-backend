import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, patchObject, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUserProfile } from '../types'

interface IRequest extends Request {
	body: {
		patch: IUserProfile
	}
	params: {
		id: string
	}
}

export default async (req: IRequest, _res: Response, next: NextFunction) => {
	const id = req.params.id
	const patch = req.body.patch
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
	if (data) {
		// change the data object and save it
		patchObject(data, { profile: patch })
		data.save()
		return next(
			returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated))
		)
	}
	return next(returnHandler(200, data, feedback('success', SUCCESS.found)))
}
