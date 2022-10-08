import { asyncHandler } from '@helpers'
import { $asyncHandlerReturn } from 'lib/types/generic'
import User from '../model/User'
import { IUserDocument } from '../types'

export const followUserService = (followerId: string, followedId: string): $asyncHandlerReturn<IUserDocument> => {
	return asyncHandler<IUserDocument>(
		User.updateOne(
			{ _id: followerId },
			{
				$addToSet: {
					'profile.following': followedId,
				},
			},
			{ new: true },
		),
	)
}
export const unfollowUserService = (followerId: string, followedId: string): $asyncHandlerReturn<IUserDocument> => {
	return asyncHandler<IUserDocument>(
		User.updateOne(
			{ _id: followerId },
			{
				$pull: {
					'profile.following': followedId,
				},
			},
			{ new: true },
		),
	)
}

export const addFolowerService = (followedId: string, followerId: string): $asyncHandlerReturn<IUserDocument> => {
	return asyncHandler<IUserDocument>(
		User.updateOne(
			{ _id: followedId },
			{
				$addToSet: {
					'profile.followers': followerId,
				},
			},
			{ new: true },
		),
	)
}

export const removeFolowerService = (followedId: string, followerId: string): $asyncHandlerReturn<IUserDocument> => {
	return asyncHandler<IUserDocument>(
		User.updateOne(
			{ _id: followedId },
			{
				$pull: {
					'profile.followers': followerId,
				},
			},
			{ new: true },
		),
	)
}
