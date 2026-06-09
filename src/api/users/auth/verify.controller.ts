import { AUTH, ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { asyncHandler } from 'async-handler-ts'
import { verifyEmailService } from './verify.service'
import { sign } from 'jsonwebtoken'

export const verifyEmailController: RequestHandler = async (req, res, next) => {
  const userId = req.query.userId as string
  const token = req.query.token as string

  if (!userId || !token)
    return next(
      returnHandler(
        StatusCodes.BAD_REQUEST,
        null,
        feedback('error', 'User ID and token are required'),
      ),
    )

  const [user, error] = await asyncHandler(verifyEmailService({ token, userId }))

  if (!user || error)
    return next(
      returnHandler(StatusCodes.UNAUTHORIZED, error, feedback('error', ERROR.unauthorized)),
    )
  const authToken = sign({ id: user._id }, AUTH.secret, {
    expiresIn: AUTH.expiry as any,
  })
  return next(
    returnHandler(
      StatusCodes.OK,
      {
        token: authToken,
        user,
      },
      feedback('success', SUCCESS.authenticated),
    ),
  )
}
