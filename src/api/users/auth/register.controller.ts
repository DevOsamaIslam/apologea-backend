import { AUTH, ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { TRegistrationPayload } from '../users.schema'
import { registerUser } from './register.service'

export const RegisterUserController: RequestHandler = async (req, res, next) => {
  const [data, error] = await registerUser(req.body as TRegistrationPayload)

  if (data)
    return next(
      returnHandler(
        StatusCodes.CREATED,
        {
          token: sign({ id: data.id }, AUTH.secret, {
            expiresIn: AUTH.expiry,
          }),
          data,
        },
        feedback('success', SUCCESS.registered),
      ),
    )
  if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
}
