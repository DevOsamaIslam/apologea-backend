import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TCreateResource } from '../resources.schema'
import { createResourceService } from './create.service'

export const createController: RequestHandler = async (req, res, next) => {
  const resource = req.body as TCreateResource

  const [newResource, error] = await asyncHandler(
    createResourceService({ userId: req.user.id, resource }),
  )

  if (error)
    return next(
      returnHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error,
        feedback('error', ERROR.createFailed),
      ),
    )

  return next(returnHandler(StatusCodes.CREATED, newResource, feedback('success', SUCCESS.created)))
}
