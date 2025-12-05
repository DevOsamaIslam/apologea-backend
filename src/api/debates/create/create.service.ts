import { UserModel } from 'api/users/model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { DebateModel } from '../model/Debate.Model'
import { Request } from 'express'
import { TCreateDebate } from '../debates.schema'
import { createSlug } from '@helpers'

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

    if (challenged) {
      challenged.debateIds.push(newDebate.id)
      await challenged.save()
    }

    return newDebate
  })
}
