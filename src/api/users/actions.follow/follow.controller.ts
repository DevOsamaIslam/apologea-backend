import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { addFolowerService, followUserService, removeFolowerService, unfollowUserService } from './follow.service'

type $body = {
	action?: 'add' | 'remove'
}

type params = { userId?: string }

export default async (req: Request<params, any, $body>, _res: Response, next: NextFunction) => {
	const action = req.body.action
	const onUser = req.params.userId
	if (!onUser || !action)
		return next(returnHandler(StatusCodes.BAD_REQUEST, { action, userId: onUser }, feedback('error', ERROR.invalidParams)))

	if (action === 'add') {
		let [data, error] = await followUserService(req.user!.id, onUser)
		if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
		if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

		let [data2, error2] = await addFolowerService(onUser, req.user!.id)
		if (error2) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
		if (!data2) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

		return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.updated)))
	} else {
		let [data, error] = await unfollowUserService(req.user!.id, onUser)
		if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
		if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

		let [data2, error2] = await removeFolowerService(onUser, req.user!.id)
		if (error2) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
		if (!data2) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

		return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.updated)))
	}
}
