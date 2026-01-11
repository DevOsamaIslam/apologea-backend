import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { deleteGalleryItemService } from './delete.service'

export const deleteGalleryItemController: RequestHandler = async (req, res, next) => {
  const [result, error] = await asyncHandler(deleteGalleryItemService(req.params.id))
  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  if (!result.deleted.acknowledged)
    return next(
      returnHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error,
        feedback('error', 'File(s) not deleted'),
      ),
    )

  return next(returnHandler(StatusCodes.CREATED, result.item, feedback('success', SUCCESS.deleted)))
}
