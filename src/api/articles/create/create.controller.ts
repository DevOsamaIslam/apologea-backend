import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { TCreateArticle } from '../articles.schema'
import { ArticleModel } from '../model/Article.Model'
import { createArticleService } from './create.service'

export const createController: RequestHandler = async (req, res, next) => {
  const article = req.body as TCreateArticle

  const [newArticle, error] = await asyncHandler(
    createArticleService({ userId: req.user.id, article }),
  )

  if (error)
    return next(
      returnHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error,
        feedback('error', ERROR.createFailed),
      ),
    )

  return next(returnHandler(StatusCodes.CREATED, newArticle, feedback('success', SUCCESS.created)))
}
