import { ERROR, SUCCESS, WARNING } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUserByEmailService } from '../fetch/fetch.service'
import { resetPasswordService, verifyTokenService } from './reset.service'

export const forgotPasswordController: RequestHandler = async (req, res, next) => {
  const email = req.body.email as string

  const [user, error] = await getUserByEmailService(email)

  if (!user || error) return next(returnHandler(StatusCodes.NOT_FOUND, error, feedback('warning', WARNING.noData)))

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.key)))
}

export const verifyTokenController: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId
  const token = req.params.token

  const [user, error] = await verifyTokenService({ token, userId })

  if (!user || error) return next(returnHandler(StatusCodes.UNAUTHORIZED, error, feedback('warning', ERROR.unauthorized)))

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.authenticated)))
}

export const resetPasswordController: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId as string
  const newPassword = req.body.newPassword as string

  const [user, error] = await resetPasswordService({ newPassword, userId })

  if (!user || error) return next(returnHandler(StatusCodes.UNAUTHORIZED, error, feedback('warning', ERROR.unauthorized)))

  return next(returnHandler(StatusCodes.OK, user, feedback('success', SUCCESS.passwordChanged)))
}
