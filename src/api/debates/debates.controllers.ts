import { ERROR, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { createSlug, feedback, mapToMongooseFilter, returnHandler } from '@helpers'
import { UserModel } from 'api/users/model/User.Model'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'
import { z } from 'zod'
import { TCreateDebate, TUpdateDebate } from './debates.schema'
import { DebateModel } from './model/Debate.Model'

export default {
  getAll: async (req, res, next) => {
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
  },

  getOne: async (req, res, next) => {
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
  },

  create: async (req, res, next) => {
    const debate = req.body as TCreateDebate
    const slug = createSlug(debate.title)

    const constructStages =
      debate.structure
        ?.map(stage => {
          if (stage.max > 1)
            return Array.from({ length: stage.max }, () => ({
              name: stage.name,
              userId: stage.startingUser,
            }))
          else
            return {
              name: stage.name,
              userId: stage.startingUser,
            }
        })
        .flat() || []

    console.log({ constructStages })

    const debateObject = new DebateModel({
      ...debate,
      creatorId: req.user.id,
      slug,
      stages: constructStages,
    })

    const [newDebate, error] = await asyncHandler(
      runTransaction(async () => {
        const newDebate = await debateObject.save()

        const challenged = await UserModel.findById(debate.challengedId).exec()

        if (challenged) {
          challenged.debateIds.push(newDebate.id)
          await challenged.save()
        }

        return newDebate
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

    return next(returnHandler(StatusCodes.CREATED, newDebate, feedback('success', SUCCESS.created)))
  },

  update: async (req, res, next) => {
    const patch = req.body as TUpdateDebate

    const [debate, error] = await asyncHandler(DebateModel.findById(patch.id).exec())

    if (error)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )

    if (!debate)
      return next(
        returnHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error,
          feedback('warning', WARNING.noData),
        ),
      )

    Object.entries(patch).forEach(([key, value]) => {
      // @ts-expect-error
      debate[key] = value
    })
    debate.save()

    return next(returnHandler(StatusCodes.OK, debate, feedback('success', SUCCESS.updated)))
  },

  delete: async (req, res, next) => {
    const debateId = req.params.id

    const [toDelete, error] = await asyncHandler(DebateModel.findById(debateId).exec())

    if (error || !toDelete)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )
    if (req.user.id !== String(toDelete.creatorId))
      return next(
        returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)),
      )

    const [deleted, deleteError] = await asyncHandler(
      runTransaction(async () => {
        await DebateModel.findByIdAndDelete(toDelete.id).exec()

        const creator = await UserModel.findById(req.user.id).exec()

        if (creator)
          creator.debateIds = creator.debateIds.filter(debate => {
            return debate !== toDelete.id
          })
        creator?.save()

        const challenged = await UserModel.findById(toDelete.challengedId).exec()

        if (challenged)
          challenged.debateIds = challenged.debateIds.filter(debate => {
            return debate !== toDelete.id
          })
        challenged?.save()
      }),
    )

    if (deleteError)
      return next(
        returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
      )

    return next(returnHandler(StatusCodes.OK, deleted, feedback('success', SUCCESS.deleted)))
  },
} satisfies Record<string, RequestHandler>
