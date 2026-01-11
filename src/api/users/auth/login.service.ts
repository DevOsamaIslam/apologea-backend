import { ERROR } from '@constants'
import { ServerError } from '@types'
import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { UserModel } from '../model/User.Model'
import { TLoginPayload } from '../users.schema'

export async function loginUser(credentials: TLoginPayload) {
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
}
