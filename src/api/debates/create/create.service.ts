import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { DebateModel } from '../model/Debate.Model'
import { Request } from 'express'
import { TCreateDebate } from '../debates.schema'
import { createSlug } from '@helpers'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { NotificationModel } from 'api/notifications/model/Notifications.Model'

export const createDebateService = async (params: { req: Request; debate: TCreateDebate }) => {
  const { req, debate } = params
  const slug = createSlug(debate.title)
  return runTransaction(async () => {
    const rivals = [
      debate.structure.startingUser,
      debate.challengedId === debate.structure.startingUser ? req.user.id : debate.challengedId,
    ]

    const newDebate = await DebateModel.create({
      ...debate,
      creatorId: req.user.id,
      slug,
      next: debate.structure.startingUser,
      stages: Array.from({ length: debate.structure.rounds * 2 }, (_, i) => {
        const user = i % 2 === 0 ? rivals[0] : rivals[1]
        return {
          userId: user,
        }
      }),
    })

    const challenged = await UserModel.findById(debate.challengedId)

    if (!challenged) {
      throw new ServerError({
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    challenged.debateIds.push(newDebate._id)

    NotificationModel.create({
      userId: challenged._id.toString(),
      data: newDebate._id,
      type: 'newDebate',
    })

    challenged.save()
    return newDebate
  })
}
