import { RequestHandler } from 'express'
import { feedback, returnHandler } from '@helpers'
import { StatusCodes } from 'http-status-codes'
import { ERROR, SUCCESS } from '@constants'
import { followService } from './follow.service'
import { asyncHandler } from 'async-handler-ts'

export const followController: RequestHandler = async (req, res, next) => {
  const { userId } = req.params
  const currentUserId = req.user.id

  if (!currentUserId) {
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)),
    )
  }

  if (userId === currentUserId.toString()) {
    return next(
      returnHandler(StatusCodes.BAD_REQUEST, null, feedback('error', 'Cannot follow yourself')),
    )
  }

  const [data, error] = await asyncHandler(
    followService({
      followerId: currentUserId.toString(),
      followingId: userId,
    }),
  )

  if (error) {
    return next(returnHandler(StatusCodes.BAD_REQUEST, error, feedback('error', ERROR.SWR)))
  }

  return next(returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.updated)))
}
