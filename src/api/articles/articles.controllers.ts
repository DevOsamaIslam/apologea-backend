import { ERROR, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { TCreateArticle, TUpdateArticle } from './articles.schemas'
import { ArticleModel } from './model/Articles.Model'

export default {
  getAll: async (req, res, next) => {
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

    if (error) return returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR))

    return next(returnHandler(StatusCodes.OK, articles, feedback('success', SUCCESS.found)))
  },

  getOne: async (req, res, next) => {
    const slug = req.params.slug
    const { populate } = req.body as z.infer<typeof PaginationSchema>

    const [article, error] = await asyncHandler(ArticleModel.findOne({ slug }).populate(populate).exec())

    if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
    if (article) {
      article.views++
      article.save()
    }
    return next(returnHandler(StatusCodes.OK, article, feedback('success', SUCCESS.found)))
  },

  create: async (req, res, next) => {
    const article = req.body as TCreateArticle
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const articleObject = new ArticleModel({
      ...article,
      authorId: req.user.id,
      slug,
    })

    const [newArticle, error] = await asyncHandler(articleObject.save())

    if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.createFailed)))

    return next(returnHandler(StatusCodes.CREATED, newArticle, feedback('success', SUCCESS.created)))
  },

  update: async (req, res, next) => {
    const patch = req.body as TUpdateArticle

    const [article, error] = await asyncHandler(ArticleModel.findById(patch.id).exec())

    if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))

    if (!article) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('warning', WARNING.noData)))
    console.log({ patch })
    Object.entries(patch).forEach(([key, value]) => {
      // @ts-expect-error
      article[key] = value
    })
    article.save()
    console.log(article)
    return next(returnHandler(StatusCodes.OK, article, feedback('success', SUCCESS.updated)))
  },
} satisfies Record<string, RequestHandler>
