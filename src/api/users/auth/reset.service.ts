import { compare, hash } from 'bcrypt'
import { Request } from 'express'
import { AUTH } from '@constants'
import { getUserByNameService } from '../fetch/fetch.service'
import { TUserDocument } from '../model/User.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'

interface IForgotPasswordServiceParams {
  user: TUserDocument
  req: Request
}
export const forgotPasswordService = async ({ user }: IForgotPasswordServiceParams) => {
  // Generate a 6-digit random number
  const token = Math.floor(100000 + Math.random() * 900000).toString()

  user.resetPasswordToken = await hash(token, AUTH.saltRounds)

  user.save()

  // send an email to the user with a token reference
}

interface IVerifyTokenServiceParams {
  token: string
  userId: string
}
export const verifyTokenService = async ({ token, userId }: IVerifyTokenServiceParams) => {
  const user = await getUserByNameService(userId)

  if (!user)
    throw new ServerError({
      message: 'User not found',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'error',
    })

  // check if the user has requested a password change
  if (!user.resetPasswordToken)
    throw new ServerError({
      message: 'User did not request password reset or token expired',
      statusCode: StatusCodes.UNAUTHORIZED,
      type: 'error',
    })

  // check the validity of the token
  const isMatched = await compare(token, user.resetPasswordToken)

  if (!isMatched)
    throw new ServerError({
      message: 'Invalid token',
      statusCode: StatusCodes.UNAUTHORIZED,
      type: 'error',
    })

  return user
}

interface IResetPasswordServiceParams {
  userId: string
  newPassword: string
}
export const resetPasswordService = async ({
  newPassword,
  userId,
}: IResetPasswordServiceParams) => {
  const user = await getUserByNameService(userId)

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
