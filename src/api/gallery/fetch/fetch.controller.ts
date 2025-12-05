import { ERROR, SUCCESS } from '@constants'
import { feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { TPaginatedBody } from '@types'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GalleryModel } from '../model/Gallery.Model'

export const getAllController: RequestHandler = async (req, res, next) => {
  const { filters, limit, page, populate, sort } = req.body as TPaginatedBody
  const mappedFilters = {
    ...mapToMongooseFilter(filters),
    userId: { $eq: req.user.id },
  }

  const [gallery, error] = await asyncHandler(
    GalleryModel.paginate(mappedFilters, {
      page,
      limit,
      sort,
      populate,
    }),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, gallery, feedback('success', SUCCESS.found)))
}
