import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

export const pingController: RequestHandler = (req, res, next) => {
  if (req.user) return next(returnHandler(StatusCodes.OK, req.user, feedback('success', SUCCESS.authenticated)))

  return next(returnHandler(StatusCodes.UNAUTHORIZED, null, feedback('error', ERROR.unauthorized)))
}
