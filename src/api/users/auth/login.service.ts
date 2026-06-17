import { ERROR } from '@constants'
import { ServerError } from '@types'
import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { UserModel } from '../model/User.Model'
import { TLoginPayload } from '../users.schema'
import { EmailDispatcher } from 'lib/email'
import { generateToken, runTransaction } from '@helpers'

export function loginUser(credentials: TLoginPayload) {
  return runTransaction(async () => {
    const { email, password } = credentials

    const user = await UserModel.findOne({ email })

    if (user && !user.verification.verifiedAt) {
      const token = generateToken()
      new EmailDispatcher().sendVerifyEmail({ user, token })
      user.verification.code = token
      user.verification.lastTry = new Date()

      await user.save()
    }

    if (!user || !user.verification.verifiedAt)
      throw new ServerError({
        message: 'User not found or not verified',
        statusCode: StatusCodes.UNAUTHORIZED,
        type: 'error',
      })

    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) {
      throw new ServerError({
        message: ERROR.wrongUsernamePassword,
        statusCode: StatusCodes.UNAUTHORIZED,
        type: 'error',
      })
    }

    return user
  })
}
