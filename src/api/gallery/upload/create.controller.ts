import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { uploadGalleryItemService } from './upload.service'

export const uploadController: RequestHandler = async (req, res, next) => {
  const [result, error] = await asyncHandler(
    uploadGalleryItemService({
      req,
      fieldName: 'files',
      userId: req.user.id,
    }),
  )
  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.CREATED, result, feedback('success', SUCCESS.uploaded)))
}
