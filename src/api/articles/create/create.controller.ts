import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { TCreateArticle } from '../articles.schema'
import { ArticleModel } from '../model/Article.Model'

export const createController: RequestHandler = async (req, res, next) => {
  const article = req.body as TCreateArticle
  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const articleObject = new ArticleModel({
    ...article,
    authorId: req.user.id,
    slug,
  })

  const [newArticle, error] = await asyncHandler(
    runTransaction(async () => {
      const newArticle = await articleObject.save()

      if (article.responseToId) {
        const counterArticle = await ArticleModel.findById(article.responseToId)
        counterArticle?.responsesIds.push(newArticle._id)
        counterArticle?.save()
      }

      return newArticle
    }),
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
