import User from '../model/User'
import { asyncHandler, returnHandler } from '#lib/helpers'
import { NextFunction, Request, Response } from 'express'

export default async (req: Request, _res: Response, next: NextFunction) => {
	const data = await asyncHandler(User.find(req.body.filters).select('profile'))

	if (data.length < 1) return next(returnHandler(404, null))
	if (data.error) return next(returnHandler(404, data.error))
	return next(returnHandler(200, data))
}
