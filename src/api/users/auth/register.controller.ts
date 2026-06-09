import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TRegistrationPayload } from '../users.schema'
import { registerUser } from './register.service'

export const RegisterUserController: RequestHandler = async (req, res, next) => {
  const [data, error] = await asyncHandler(
    registerUser({ input: req.body as TRegistrationPayload, req }),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  return next(returnHandler(StatusCodes.CREATED, null, feedback('success', SUCCESS.registered)))
}
