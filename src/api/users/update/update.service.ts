import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'
import { TUserSchema, TUserDocument } from '../model/User.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'

interface IProps {
  username: string
  profile: Partial<TUserSchema>
}
export const updateUserService = async ({ username, profile }: IProps) => {
  return runTransaction(async () => {
    // check if the user exists
    const user = await UserModel.findOne({ username })

    if (!user)
      throw new ServerError({
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })

    Object.entries(profile).forEach(([key, value]) => {
      if (key in user) {
        // @ts-expect-error TODO check later
        user[key] = value
      }
    })
    await user.save()
    return user
  })
}
