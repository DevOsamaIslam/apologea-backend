import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TCreateDebate } from '../debates.schema'
import { createDebateService } from './create.service'

export const createDebateController: RequestHandler = async (req, _, next) => {
  const debate = req.body as TCreateDebate

  const [newDebate, error] = await asyncHandler(createDebateService({ req, debate }))

  if (error)
    return next(
      returnHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error,
        feedback('error', ERROR.createFailed),
      ),
    )

  return next(returnHandler(StatusCodes.CREATED, newDebate, feedback('success', SUCCESS.created)))
}
