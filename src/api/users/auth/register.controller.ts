import { AUTH, ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { TRegistrationPayload } from '../users.schema'
import { registerUser } from './register.service'
import { asyncHandler } from 'async-handler-ts'
import { uploadGalleryItemService } from 'api/gallery/upload/upload.service'

export const RegisterUserController: RequestHandler = async (req, res, next) => {
  const [data, error] = await asyncHandler(
    registerUser({ input: req.body as TRegistrationPayload, req }),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )
  return next(
    returnHandler(
      StatusCodes.CREATED,
      {
        token: sign({ id: data.id }, AUTH.secret, { expiresIn: AUTH.expiry as any }),
        data,
      },
      feedback('success', SUCCESS.registered),
    ),
  )
}
