import { ERROR, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { UserModel } from 'api/users/model/User.Model'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { z } from 'zod'
import { TCreateArticle, TUpdateArticle } from './articles.schema'
import { ArticleModel } from './model/Article.Model'

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

    if (error)
      return returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR))

    return next(returnHandler(StatusCodes.OK, articles, feedback('success', SUCCESS.found)))
  },

  getOne: async (req, res, next) => {
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

    const [newArticle, error] = await asyncHandler(
      runTransaction(async () => {
        const newArticle = await articleObject.save()

        if (article.responseToId) {
          const counterArticle = await ArticleModel.findById(article.responseToId)
          counterArticle?.responsesIds.push(newArticle.id)
          counterArticle?.save()
        }

        return newArticle
      }),
    )

    if (error)
      return next(
        returnHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error,
          feedback('error', ERROR.createFailed),
        ),
      )

    return next(
      returnHandler(StatusCodes.CREATED, newArticle, feedback('success', SUCCESS.created)),
    )
  },

  update: async (req, res, next) => {
    const patch = req.body as TUpdateArticle
    const id = req.params.id

    const [article, error] = await asyncHandler(ArticleModel.findById(id).exec())

    if (error)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )

    if (!article)
      return next(
        returnHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error,
          feedback('warning', WARNING.noData),
        ),
      )

    Object.entries(patch).forEach(([key, value]) => {
      // @ts-expect-error
      article[key] = value
    })
    article.save()

    return next(returnHandler(StatusCodes.OK, article, feedback('success', SUCCESS.updated)))
  },

  delete: async (req, res, next) => {
    const articleId = req.params.id

    const [toDelete, error] = await asyncHandler(ArticleModel.findById(articleId).exec())

    console.log('reached', toDelete, error)
    if (error || !toDelete)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )
    if (req.user.id !== String(toDelete.authorId))
      return next(
        returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)),
      )

    const [deleted, deleteError] = await asyncHandler(
      runTransaction(async () => {
        await ArticleModel.findByIdAndDelete(toDelete.id).exec()

        const user = await UserModel.findById(req.user.id).exec()

        if (user)
          user.articleIds = user.articleIds.filter(article => {
            console.log(article)
            return article !== toDelete.id
          })
        user?.save()
      }),
    )

    if (deleteError)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )

    return next(returnHandler(StatusCodes.OK, deleted, feedback('success', SUCCESS.deleted)))
  },
} satisfies Record<string, RequestHandler>
