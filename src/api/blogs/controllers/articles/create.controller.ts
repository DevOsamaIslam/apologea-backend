import { IUser } from '#/api/users/model/Schema'
import { feedback, permissioned, protectedRoute, returnHandler } from '#helpers'
import { ERROR, SUCCESS } from '#lib/constants'
import Blog from '../../model/Blog'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

type IBody = {
	title: string
	body: string
	excerpt?: string
}
const mainTask = (
	req: Request<null, null, IBody>,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as IUser
	const { title, body, excerpt } = req.body
	Blog.create({
		title,
		body,
		excerpt,
		author: user?.id,
	})
		.then(async (data) => {
			return next(
				returnHandler(
					StatusCodes.CREATED,
					data,
					feedback('success', SUCCESS.created)
				)
			)
		})
		.catch((err) => {
			return next(
				returnHandler(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err,
					feedback('error', ERROR.SWR)
				)
			)
		})
}
export default [protectedRoute, permissioned(2), mainTask]
