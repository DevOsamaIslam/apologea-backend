import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, patchObject, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IUser, IUserProfile } from '../types'
import { HydratedDocument } from 'mongoose'

type $body = {
	patch: IUserProfile
}
type $params = {
	id: string
}

export default async (req: Request<$params, any, $body>, _res: Response, next: NextFunction) => {
	const id = req.params.id
	const patch = req.body.patch
	const [data, error] = await asyncHandler<HydratedDocument<IUser>>(User.findById(id, 'profile'))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
	if (data) {
		// change the data object and save it
		patchObject(data, { profile: patch })
		data.save()
		return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated)))
	}
	return next(returnHandler(200, data, feedback('success', SUCCESS.found)))
}
