import { UserModel } from '../model/User.Model'
import { runTransaction } from '@helpers'
import { ServerError } from '@types'

interface IFollowServiceProps {
  followerId: string
  followingId: string
}

export const followService = async ({ followerId, followingId }: IFollowServiceProps) => {
  return runTransaction(async () => {
    // Check if already following
    const existingFollow = await UserModel.findOne({
      _id: followingId,
      followerIds: followerId,
    })

    if (existingFollow) {
      throw new ServerError({
        message: 'Already following this user',
        statusCode: 400,
        type: 'error',
      })
    }

    // Check if user exists
    const userToFollow = await UserModel.findById(followingId)
    if (!userToFollow) {
      throw new ServerError({
        message: 'User not found',
        statusCode: 404,
        type: 'error',
      })
    }

    // Add follower
    await UserModel.findByIdAndUpdate(
      followingId,
      { $addToSet: { followerIds: followerId } },
      { new: true },
    )

    // Add to following list
    await UserModel.findByIdAndUpdate(
      followerId,
      { $addToSet: { followingIds: followingId } },
      { new: true },
    )

    return { message: 'Successfully followed user' }
  })
}
