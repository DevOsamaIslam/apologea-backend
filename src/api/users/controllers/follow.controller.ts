import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import User from '../model/User'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import { IUser } from '../types'

type $body = {
	userID: string
	action: 'add' | 'remove'
}

export default async (req: Request<any, any, $body>, _res: Response, next: NextFunction) => {
	const userID = req.body.userID
	const action = req.body.action === 'add' ? '$addToSet' : '$pull'
	// add the logged in user to the list of followers of the passed in user
	const data: HydratedDocument<IUser> = await asyncHandler(
		User.updateOne(
			{ _id: req.user?.id },
			{
				[action]: {
					'profile.following': userID,
				},
			},
			{ new: true },
		),
	)
	// check if the user exists
	if (!data) {
		return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	}
	if (data.error) {
		return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))
	}
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated)))
}
