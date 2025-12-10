import { createSlug } from '@helpers'
import { ServerError } from '@types'
import { DebateModel } from 'api/debates/model/Debate.Model'
import { createMultipleNotificationsService } from 'api/notifications/create/create.service'
import { NOTIFICATION_TYPES, TCreateNotification } from 'api/notifications/notifications.schema'
import { UserModel } from 'api/users/model/User.Model'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { TCreateArticle } from '../articles.schema'
import { ArticleModel } from '../model/Article.Model'

export const createArticleService = async (params: { userId: string; article: TCreateArticle }) => {
  const { userId, article } = params
  const slug = createSlug(article.title)
  const userNotificationsMap = new Map<string, TCreateNotification>()

  return runTransaction(async () => {
    const newArticle = await ArticleModel.create({
      ...article,
      authorId: userId,
      slug,
    })

    const user = await UserModel.findById(userId)
    if (!user)
      throw new ServerError({
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })

    user.articleIds.push(newArticle._id)
    user.save()

    if (article.debateId) {
      const debate = await DebateModel.findById(article.debateId)
      if (!debate)
        throw new ServerError({
          message: 'Debate not found',
          statusCode: StatusCodes.NOT_FOUND,
          type: 'error',
        })

      const notifiedUserId =
        debate?.challengedId.toString() === user._id.toString()
          ? debate.creatorId
          : debate.challengedId
      debate.stages.some((stage, index) => {
        const stageUser = stage.userId.toString()
        if (stageUser === userId && !stage.articleId) {
          stage.articleId = newArticle._id
          if (index === debate.stages.length - 1) {
            debate.completedAt = new Date().toISOString()
          } else {
            debate.next = debate.stages[index + 1].userId!
          }
          return true
        }
      })
      debate.save()
      userNotificationsMap.set(notifiedUserId.toString(), {
        userId: notifiedUserId.toString(),
        data: newArticle.slug,
        type: NOTIFICATION_TYPES.debateResponse,
      })
    }

    if (article.responseToId) {
      const counterArticle = await ArticleModel.findById(article.responseToId)
      counterArticle?.responsesIds.push(newArticle._id)
      counterArticle?.save()
      userNotificationsMap.set(article.responseToId, {
        userId: article.responseToId,
        data: newArticle.slug,
        type: NOTIFICATION_TYPES.articleResponse,
      })
    }

    user.followerIds.map(followerId =>
      userNotificationsMap.set(followerId.toString(), {
        userId: followerId.toString(),
        data: newArticle.slug,
        type: NOTIFICATION_TYPES.newArticle,
      }),
    )

    createMultipleNotificationsService(Array.from(userNotificationsMap.values()))

    return newArticle
  })
}
