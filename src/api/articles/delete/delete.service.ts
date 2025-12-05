import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { ArticleModel } from '../model/Article.Model'

export const deleteArticleService = async (params: { articleId: string; userId: string }) => {
  const { articleId, userId } = params

  return runTransaction(async () => {
    const article = await ArticleModel.findById(articleId)

    if (!article) {
      throw new Error('Article not found')
    }

    if (String(article.authorId) !== userId) {
      throw new Error('Unauthorized to delete this article')
    }

    await ArticleModel.findByIdAndDelete(articleId)

    const user = await UserModel.findById(userId)
    if (user) {
      user.articleIds = user.articleIds.filter(article => article !== articleId)
      await user.save()
    }

    return { deleted: true }
  })
}
