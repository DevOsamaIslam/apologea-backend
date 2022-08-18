import {
	asyncHandler,
	feedback,
	permissioned,
	protectedRoute,
	returnHandler,
} from '@helpers'
import { ERROR, SUCCESS } from '@constants'
import Article from '../../model/Article'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

type $body = {
	title: string
	body: string
	excerpt?: string
	responseTo?: string
}
const mainTask = async (
	req: Request<null, null, $body>,
	_res: Response,
	next: NextFunction
) => {
	const { title, body, excerpt } = req.body
	const data = await asyncHandler(
		Article.create({
			title,
			body,
			excerpt,
			author: req.user?.id,
			responseTo: req.body.responseTo,
		})
	)
	if (data.error) {
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)
	}
	return next(
		returnHandler(
			StatusCodes.CREATED,
			data,
			feedback('success', SUCCESS.created)
		)
	)
}
export default [protectedRoute, permissioned(2), mainTask]
