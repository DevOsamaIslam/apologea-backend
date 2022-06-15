import { ERROR, WARNING } from '#lib/constants'
import {
	feedback,
	permissioned,
	protectedRoute,
	returnHandler,
} from '#lib/helpers'
import Article from '../../model/Article'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import { IUser } from '#/api/users/types'
import { IArticle } from '../../types'

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
	Article.findById(id, (err: ErrorEvent, data: HydratedDocument<IArticle>) => {
		if (!data)
			return next(
				returnHandler(
					StatusCodes.NOT_FOUND,
					null,
					feedback('warning', WARNING.noData)
				)
			)
		if (err)
			return next(
				returnHandler(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err,
					feedback('error', ERROR.SWR)
				)
			)

		const author = data.author.toString()

		if (author !== user.id)
			return next(
				returnHandler(
					StatusCodes.UNAUTHORIZED,
					null,
					feedback('warning', WARNING.unauthorized)
				)
			)
		data.title = title || data.title
		data.body = body || data.body
		data.visible = visible || data.visible
		data.save()
		return next(returnHandler(StatusCodes.OK, data))
	})
}

export default [protectedRoute, permissioned(2), mainTask]
