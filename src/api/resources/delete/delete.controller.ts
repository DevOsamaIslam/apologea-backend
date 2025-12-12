import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { deleteResourceService } from './delete.service'

export const deleteController: RequestHandler = async (req, res, next) => {
  const resourceId = req.params.id

  const [deleted, error] = await asyncHandler(
    deleteResourceService({ resourceId, userId: req.user.id }),
  )

  if (error) {
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  }

  return next(returnHandler(StatusCodes.OK, deleted, feedback('success', SUCCESS.deleted)))
}
