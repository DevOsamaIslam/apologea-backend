import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { ArticleModel } from '../model/Article.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'

export const deleteArticleService = async (params: { articleId: string; userId: string }) => {
  const { articleId, userId } = params

  return runTransaction(async () => {
    const article = await ArticleModel.findById(articleId)

    if (!article) {
      throw new ServerError({
        message: 'Article not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    article.deleteOne().exec()

    const user = await UserModel.findById(userId)
    if (user) {
      user.articleIds = user.articleIds.filter(article => String(article) !== articleId)
      await user.save()
    }

    return true
  })
}
