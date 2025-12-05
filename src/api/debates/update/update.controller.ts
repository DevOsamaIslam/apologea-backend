import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TUpdateDebate } from '../debates.schema'
import { DebateModel } from '../model/Debate.Model'

export const updateController: RequestHandler = async (req, res, next) => {
  const patch = req.body as TUpdateDebate

  const [debate, error] = await asyncHandler(DebateModel.findById(patch.id).exec())

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  if (!debate)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('warning', WARNING.noData)),
    )

  Object.entries(patch).forEach(([key, value]) => {
    // @ts-expect-error
    debate[key] = value
  })
  debate.save()

  return next(returnHandler(StatusCodes.OK, debate, feedback('success', SUCCESS.updated)))
}
