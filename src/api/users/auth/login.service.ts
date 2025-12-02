import { asyncHandler } from 'async-handler-ts'
import { compare } from 'bcrypt'
import { UserModel } from '../model/User.Model'
import { TLoginPayload } from '../users.schema'
import { TUserDocument } from '../model/User.Model'
import { runTransaction } from 'lib/helpers/transactions'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { ERROR } from '@constants'

export async function loginUser(credentials: TLoginPayload) {
  return runTransaction(async () => {
    const { email, password } = credentials

    const user = await UserModel.findOne({ email })

    if (!user)
      throw new ServerError({
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })

    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) {
      throw new ServerError({
        message: ERROR.wrongUsernamePassword,
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    return user
  })
}
