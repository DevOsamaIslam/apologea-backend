import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { ArticleModel } from '../model/Article.Model'
import { UserModel } from 'api/users/model/User.Model'

export const deleteController: RequestHandler = async (req, res, next) => {
  const articleId = req.params.id

  const [toDelete, error] = await asyncHandler(ArticleModel.findById(articleId).exec())

  if (error || !toDelete)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (req.user.id !== String(toDelete.authorId))
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)),
    )

  const [deleted, deleteError] = await asyncHandler(
    runTransaction(async () => {
      await ArticleModel.findByIdAndDelete(toDelete.id).exec()

      const user = await UserModel.findById(req.user.id).exec()

      if (user)
        user.articleIds = user.articleIds.filter(article => {
          return article !== toDelete.id
        })
      user?.save()
    }),
  )

  if (deleteError)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, deleted, feedback('success', SUCCESS.deleted)))
}
