import { getUserByIdService } from '../fetch/fetch.service'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { EmailDispatcher } from 'lib/email'

interface IVerifyEmailServiceParams {
  token: string
  userId: string
}

export const verifyEmailService = async ({ token, userId }: IVerifyEmailServiceParams) => {
  const user = await getUserByIdService(userId)

  if (!user)
    throw new ServerError({
      message: 'User not found',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'error',
    })

  // Check if user already verified
  if (user.verification.verifiedAt)
    throw new ServerError({
      message: 'Email already verified',
      statusCode: StatusCodes.BAD_REQUEST,
      type: 'error',
    })

  // Check if verification code exists
  if (!user.verification.code)
    throw new ServerError({
      message: 'No verification code found. Please request a new verification email.',
      statusCode: StatusCodes.BAD_REQUEST,
      type: 'error',
    })

  // Check if token matches
  if (user.verification.code !== token)
    throw new ServerError({
      message: 'Invalid verification token',
      statusCode: StatusCodes.UNAUTHORIZED,
      type: 'error',
    })

  // Mark as verified
  user.verification.verifiedAt = new Date()
  user.verification.code = null
  await user.save()

  // Send verification success email
  const dispatcher = new EmailDispatcher()
  await dispatcher.sendVerificationSuccess({ user })

  return user
}
