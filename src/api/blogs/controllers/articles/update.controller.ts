import { IUser } from '#/api/users/model/Schema'
import { error, warning } from '#lib/constants'
import { feedback, protectedRoute, returnHandler } from '#lib/helpers'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Blog from '../../model/Blog'
import { HydratedDocument } from 'mongoose'
import { IBlog } from '../../model/BlogSchema'

type body = {
	id: string
	title: string
	body: string
	visible: boolean
}

const mainTask = (
	req: Request<null, null, body>,
	_res: Response,
	next: NextFunction
) => {
	const user = req.user as IUser
	const { id, title, body, visible } = req.body
	Blog.findById(id, (err: ErrorEvent, data: HydratedDocument<IBlog>) => {
		if (!data)
			return next(
				returnHandler(
					StatusCodes.NOT_FOUND,
					null,
					feedback('warning', warning.noData)
				)
			)
		if (err)
			return next(
				returnHandler(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err,
					feedback('error', error.SWR)
				)
			)

		const author = data.author.toString()

		if (author !== user.id)
			return next(
				returnHandler(
					StatusCodes.UNAUTHORIZED,
					null,
					feedback('warning', warning.unauthorized)
				)
			)
		data.title = title || data.title
		data.body = body || data.body
		data.visible = visible || data.visible
		data.save()
		return next(returnHandler(StatusCodes.OK, data))
	})
}

export default [protectedRoute, mainTask]
