import { ERROR, SUCCESS, WARNING } from '@constants'
import { asyncHandler, feedback, returnHandler } from '@helpers'
import { IUser } from 'api/users/types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument } from 'mongoose'
import Article from '../../model/Article'
import { IArticle, IComment } from '../../types'

type $body = {
	action: 'add' | 'remove'
	comment?: string
	id: string
}

export default async (req: Request<any, any, $body>, res: Response, next: NextFunction) => {
	const action = req.body.action
	const id = req.body.id
	const comment = req.body.comment
	const data: HydratedDocument<IArticle> = await asyncHandler(Article.findById(id))

	if (!data) return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))
	if (data.error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, data.error, feedback('error', ERROR.SWR)))
	// if we found the article
	if (action === 'add' && comment) {
		data.comments.push({
			contents: comment,
			author: req.user!.id,
		})
	} else {
		data.comments = data.comments.filter((oldComment: IComment) => {
			if (oldComment._id?.toString() !== comment && oldComment.author !== req.user!.id) return oldComment
		})
	}
	data.save()
	return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated)))
}
