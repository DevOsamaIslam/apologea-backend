import { UserModel } from '../model/User.Model'
import { runTransaction } from '@helpers'
import { ServerError } from '@types'

interface IUnfollowServiceProps {
  followerId: string
  followingId: string
}

export const unfollowService = async ({ followerId, followingId }: IUnfollowServiceProps) => {
  return runTransaction(async () => {
    // Check if following
    const existingFollow = await UserModel.findOne({
      _id: followingId,
      followerIds: followerId,
    })

    if (!existingFollow) {
      throw new ServerError({
        message: 'Not following this user',
        statusCode: 400,
        type: 'error',
      })
    }

    // Check if user exists
    const userToUnfollow = await UserModel.findById(followingId)
    if (!userToUnfollow) {
      throw new ServerError({
        message: 'User not found',
        statusCode: 404,
        type: 'error',
      })
    }

    // Remove follower
    await UserModel.findByIdAndUpdate(
      followingId,
      { $pull: { followerIds: followerId } },
      { new: true },
    )

    // Remove from following list
    await UserModel.findByIdAndUpdate(
      followerId,
      { $pull: { followingIds: followingId } },
      { new: true },
    )

    return { message: 'Successfully unfollowed user' }
  })
}
