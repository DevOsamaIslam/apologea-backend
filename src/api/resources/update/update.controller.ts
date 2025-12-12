import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TUpdateResource } from '../resources.schema'
import { updateResourceService } from './update.service'

export const updateController: RequestHandler = async (req, res, next) => {
  const patch = req.body as TUpdateResource
  const id = req.params.id

  const [resource, error] = await asyncHandler(updateResourceService({ id, resource: patch }))

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  if (!resource)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('warning', WARNING.noData)),
    )

  return next(returnHandler(StatusCodes.OK, resource, feedback('success', SUCCESS.updated)))
}
