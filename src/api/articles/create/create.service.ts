import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { ArticleModel } from '../model/Article.Model'
import { Request } from 'express'
import { TCreateArticle } from '../articles.schema'
import { createSlug } from '@helpers'
import { createMultipleNotificationsService } from 'api/notifications/create/create.service'
import { NOTIFICATION_TYPES } from 'api/notifications/notifications.schema'

export const createArticleService = async (params: { req: Request; article: TCreateArticle }) => {
  const { req, article } = params
  const slug = createSlug(article.title)

  return runTransaction(async () => {
    const newArticle = await ArticleModel.create({
      ...article,
      authorId: req.user.id,
      slug,
    })

    if (article.responseToId) {
      const counterArticle = await ArticleModel.findById(article.responseToId)
      counterArticle?.responsesIds.push(newArticle._id)
      counterArticle?.save()
    }

    if (req.user.followerIds.length) {
      createMultipleNotificationsService(
        req.user.followerIds.map(followerId => ({
          userId: followerId,
          data: newArticle._id,
          type: NOTIFICATION_TYPES.newArticle,
        })),
      )
    }

    return newArticle
  })
}
