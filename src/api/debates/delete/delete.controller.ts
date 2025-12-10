import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { UserModel } from 'api/users/model/User.Model'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { DebateModel } from '../model/Debate.Model'

export const deleteController: RequestHandler = async (req, res, next) => {
  const debateId = req.params.id

  const [toDelete, error] = await asyncHandler(DebateModel.findById(debateId).exec())

  if (error || !toDelete)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (req.user.id !== String(toDelete.creatorId))
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)),
    )

  const [deleted, deleteError] = await asyncHandler(
    runTransaction(async () => {
      await DebateModel.findByIdAndDelete(toDelete._id).exec()

      const creator = await UserModel.findById(req.user.id).exec()

      if (creator)
        creator.debateIds = creator.debateIds.filter(debate => {
          return debate !== toDelete._id
        })
      creator?.save()

      const challenged = await UserModel.findById(toDelete.challengedId).exec()

      if (challenged)
        challenged.debateIds = challenged.debateIds.filter(debate => {
          return debate !== toDelete._id
        })
      challenged?.save()
    }),
  )

  if (deleteError)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, deleted, feedback('success', SUCCESS.deleted)))
}
