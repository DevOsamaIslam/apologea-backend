import { NextFunction, Request, Response } from 'express'
import { feedback, protectedRoute, returnHandler } from '#helpers'
import Blog from '../../model/Blog'
import { IUser } from '#/api/users/model/Schema'
import { StatusCodes } from 'http-status-codes'
import { error, success } from '#lib/constants'

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
					StatusCodes.OK,
					data,
					feedback('success', success.blogCreated)
				)
			)
		})
		.catch((err) => {
			return next(
				returnHandler(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err,
					feedback('error', error.SWR)
				)
			)
		})
}
export default [protectedRoute, mainTask]
