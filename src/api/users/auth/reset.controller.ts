import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, generateToken, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUserByEmailService } from '../fetch/fetch.service'
import { forgotPasswordService, resetPasswordService, verifyTokenService } from './reset.service'
import { asyncHandler } from 'async-handler-ts'

export const forgotPasswordController: RequestHandler = async (req, res, next) => {
  const email = req.body.email as string

  const [user, error] = await asyncHandler(forgotPasswordService({ email }))

  if (!user || error)
    return next(returnHandler(StatusCodes.NOT_FOUND, error, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.key)))
}

export const verifyTokenController: RequestHandler = async (req, res, next) => {
  const token = req.body.token

  const [isSuccess, error] = await asyncHandler(verifyTokenService({ token }))

  if (!isSuccess || error)
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, error, feedback('warning', ERROR.unauthorized)),
    )

  return next(returnHandler(StatusCodes.OK, isSuccess, feedback('success', SUCCESS.authenticated)))
}

export const resetPasswordController: RequestHandler = async (req, res, next) => {
  const token = req.body.token as string
  const newPassword = req.body.password as string

  const [user, error] = await asyncHandler(resetPasswordService({ newPassword, token }))

  if (!user || error)
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, error, feedback('warning', ERROR.unauthorized)),
    )

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.passwordChanged)))
}
