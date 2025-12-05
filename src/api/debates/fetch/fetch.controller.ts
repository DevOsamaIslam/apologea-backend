import { ERROR, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { DebateModel } from '../model/Debate.Model'

export const getAllController: RequestHandler = async (req, res, next) => {
  const { limit, page, sort, filters, populate } = req.body as z.infer<typeof PaginationSchema>
  const mappedFilters = mapToMongooseFilter(filters)

  const [debates, error] = await asyncHandler(
    DebateModel.paginate(mappedFilters, {
      limit,
      page,
      sort,
      populate,
    }),
  )

  if (error)
    return returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR))

  return next(returnHandler(StatusCodes.OK, debates, feedback('success', SUCCESS.found)))
}

export const getOneController: RequestHandler = async (req, res, next) => {
  const slug = req.params.slug
  const { populate } = req.body as z.infer<typeof PaginationSchema>

  const [debate, error] = await asyncHandler(
    DebateModel.findOne({ slug }).populate(populate).exec(),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (debate) {
    debate.views++
    debate.save()
  }
  if (!debate)
    return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, debate, feedback('success', SUCCESS.found)))
}
