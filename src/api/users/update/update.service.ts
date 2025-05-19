import { asyncHandler } from 'async-handler-ts'
import { UserModel } from '../model/User.Model'
import { TUser, TUserDocument } from '../model/User.Model'

interface IProps {
  username: string
  profile: Partial<TUser>
}
export const updateUserService = async ({ username, profile }: IProps): Promise<[TUserDocument | undefined, Error | undefined]> => {
  // check if the user exists
  const [user, error] = await asyncHandler<TUserDocument | undefined>(UserModel.findOne({ username }) as any)

  if (!user || error) return [user, error]

  if (user) {
    Object.entries(profile).forEach(([key, value]) => {
      if (key in user) {
        // @ts-expect-error TODO check later
        user[key] = value
      }
    })
    await user.save()
  }
  return [user, error]
}
