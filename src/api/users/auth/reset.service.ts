import { compare, hash } from 'bcrypt'
import { Request } from 'express'
import { AUTH } from '@constants'
import { getUserByEmailService, getUserByIdService, getUserByNameService, getUserByTokenService } from '../fetch/fetch.service'
import { TUserDocument } from '../model/User.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { EmailDispatcher } from 'lib/email'
import dateFNS from 'date-fns'
import { generateToken, hashed } from '@helpers'

interface IForgotPasswordServiceParams {
  email: string
}
export const forgotPasswordService = async ({ email }: IForgotPasswordServiceParams) => {
  const user = await getUserByEmailService(email)

  if (!user) {
    throw new ServerError({
      message: 'User not found',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'error',
    })
  }

  const token = generateToken()

  user.resetPassword = {
    token,
    expiresAt: dateFNS.add(new Date(), { days: 1 }),
  }

  const dispatcher = new EmailDispatcher()
  await dispatcher.sendResetPassword({ user, token })

  await user.save()

  return true

}

interface IVerifyTokenServiceParams {
  token: string
}
export const verifyTokenService = async ({ token }: IVerifyTokenServiceParams) => {
  const user = await getUserByTokenService(token)

  if (!user)
    throw new ServerError({
      message: 'User not found',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'error',
    })

  // check if the user has requested a password change
  if (!user.resetPassword.token || (user.resetPassword.expiresAt && !dateFNS.isAfter(user.resetPassword.expiresAt, new Date())))
    throw new ServerError({
      message: 'User did not request password reset or token expired',
      statusCode: StatusCodes.UNAUTHORIZED,
      type: 'error',
    })

  // check the validity of the token
  const isMatched = (token === user.resetPassword.token)

  if (!isMatched)
    throw new ServerError({
      message: 'Invalid token',
      statusCode: StatusCodes.UNAUTHORIZED,
      type: 'error',
    })

  return true
}

interface IResetPasswordServiceParams {
  token: string
  newPassword: string
}
export const resetPasswordService = async ({
  newPassword,
  token,
}: IResetPasswordServiceParams) => {
  const user = await getUserByTokenService(token)

  if (!user)
    throw new ServerError({
      message: 'User not found',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'error',
    })

  user.password = newPassword

  await user.save()
  return user
}
