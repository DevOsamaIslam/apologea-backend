import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TUpdateDebate } from '../debates.schema'
import { updateDebateService, voteDebateService } from './update.debate'

export const updateController: RequestHandler = async (req, res, next) => {
  const patch = req.body as TUpdateDebate

  const [debate, error] = await asyncHandler(updateDebateService({ user: req.user, debate: patch }))

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, debate, feedback('success', SUCCESS.updated)))
}

// vote controller

export const voteController: RequestHandler = async (req, res, next) => {
  const id = req.params.id

  const [debate, error] = await asyncHandler(
    voteDebateService({ debateId: id, user: req.user, recipientId: req.body.recipientId }),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, debate, feedback('success', SUCCESS.updated)))
}
