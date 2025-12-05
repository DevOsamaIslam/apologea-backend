import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TUpdateArticle } from '../articles.schema'
import { ArticleModel } from '../model/Article.Model'

export const updateController: RequestHandler = async (req, res, next) => {
  const patch = req.body as TUpdateArticle
  const id = req.params.id

  const [article, error] = await asyncHandler(ArticleModel.findById(id).exec())

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  if (!article)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('warning', WARNING.noData)),
    )

  Object.entries(patch).forEach(([key, value]) => {
    // @ts-expect-error
    article[key] = value
  })
  article.save()

  return next(returnHandler(StatusCodes.OK, article, feedback('success', SUCCESS.updated)))
}
