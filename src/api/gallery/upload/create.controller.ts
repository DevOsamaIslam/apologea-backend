import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { handleFileUpload } from 'lib/helpers/files'
import { GalleryModel } from '../model/Gallery.Model'

export const uploadController: RequestHandler = async (req, res, next) => {
  const [URLs, error] = await asyncHandler(
    handleFileUpload({
      fieldName: 'files',
      req,
      targetFolder: req.user.id,
    }),
  )
  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  if (!URLs?.length)
    return next(
      returnHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error,
        feedback('error', 'Files not uploaded'),
      ),
    )

  const [saved, saveError] = await asyncHandler(
    GalleryModel.insertMany(URLs.map(url => ({ userId: req.user.id, url }))),
  )

  if (saveError)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.CREATED, saved, feedback('success', 'Files uploaded!')))
}
