import { ERROR, OPERATORS, PaginationSchema, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import {
  getResourcesService,
  getResourceBySlugService,
  getResourceByIdService,
} from './fetch.service'

export const getAllController: RequestHandler = async (req, res, next) => {
  const body = req.body as z.infer<typeof PaginationSchema>
  const userId = req.user._id.toString()
  // body.filters.private = {
  //   operator: OPERATORS.equals,
  //   value: false
  // }
  const [resources, error] = await asyncHandler(getResourcesService(body, userId))

  if (error)
    return returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR))

  return next(returnHandler(StatusCodes.OK, resources, feedback('success', SUCCESS.found)))
}

export const getOneController: RequestHandler = async (req, res, next) => {
  const slug = req.params.slug
  const { populate } = req.body as z.infer<typeof PaginationSchema>

  const [resource, error] = await asyncHandler(getResourceBySlugService({ slug, populate }))

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (!resource)
    return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, resource, feedback('success', SUCCESS.found)))
}

export const getResourceByIdController: RequestHandler = async (req, res, next) => {
  const id = req.params.id
  const { populate } = req.body as z.infer<typeof PaginationSchema>

  const [resource, error] = await asyncHandler(getResourceByIdService({ id, populate }))

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  if (!resource)
    return next(returnHandler(StatusCodes.NOT_FOUND, null, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, resource, feedback('success', SUCCESS.found)))
}
