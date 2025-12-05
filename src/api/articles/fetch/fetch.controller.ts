import { ERROR, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { ArticleModel } from '../model/Article.Model'

export const getAllController: RequestHandler = async (req, res, next) => {
  const { limit, page, sort, filters, populate } = req.body as z.infer<typeof PaginationSchema>
  const mappedFilters = mapToMongooseFilter(filters)

  const [articles, error] = await asyncHandler(
    ArticleModel.paginate(mappedFilters, {
      limit,
      page,
      sort,
      populate: populate,
    }),
  )

  if (error)
    return returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR))

  return next(returnHandler(StatusCodes.OK, articles, feedback('success', SUCCESS.found)))
}

export const getOneController: RequestHandler = async (req, res, next) => {
  const slug = req.params.slug
  const { populate } = req.body as z.infer<typeof PaginationSchema>

  const [article, error] = await asyncHandler(
    ArticleModel.findOne({ slug }).populate(populate).exec(),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (article) {
    article.views++
    article.save()
  }
  if (!article)
    return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, article, feedback('success', SUCCESS.found)))
}
