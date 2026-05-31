import { createSlug } from '@helpers'
import { ServerError } from '@types'
import { TUserDocument } from 'api/users/model/User.Model'
import { StatusCodes } from 'http-status-codes'
import mongoose, { Types } from 'mongoose'
import { runTransaction } from 'lib/helpers/transactions'
import { TUpdateDebate } from '../debates.schema'
import { DebateModel } from '../model/Debate.Model'

export const updateDebateService = async (params: {
  user: TUserDocument
  debate: TUpdateDebate
}) => {
  const { debate } = params
  return runTransaction(async (session: mongoose.ClientSession) => {
    const debateDocument = await DebateModel.findById(debate.id).session(session)

    if (!debateDocument)
      throw new ServerError({
        message: 'Debate not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })

    if (debate.title) {
      const slug = createSlug(debate.title)
      debateDocument.slug = slug
      debateDocument.title = debate.title
    }
    debateDocument.description = debate.description ?? debateDocument.description
    debateDocument.tags = debate.tags ?? debateDocument.tags

    const newDebate = await debateDocument.save({ session })

    return newDebate
  })
}

// vote
export const voteDebateService = async (params: {
  debateId: string
  user: TUserDocument
  recipientId: string
}) => {
  const { user, debateId, recipientId } = params
  return runTransaction(async (session: mongoose.ClientSession) => {
    const debateDocument = await DebateModel.findById(debateId).session(session)

    if (!debateDocument)
      throw new ServerError({
        message: 'Debate not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })

    if (user.id === recipientId) {
      throw new ServerError({
        message: 'You cannot vote for yourself',
        statusCode: StatusCodes.BAD_REQUEST,
        type: 'error',
      })
    }

    if (debateDocument.creatorId.toString() === recipientId) {
      if (!debateDocument.creatorVotes.some(v => v.toString() === user.id)) {
        debateDocument.creatorVotes.push(new Types.ObjectId(user.id))
      }
    }

    if (debateDocument.challengedId.toString() === recipientId) {
      if (!debateDocument.challengedVotes.some(v => v.toString() === user.id)) {
        debateDocument.challengedVotes.push(new Types.ObjectId(user.id))
      }
    }

    await debateDocument.save({ session })

    return debateDocument
  })
}
