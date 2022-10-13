import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/model/types'
import Article from '../model/Article'

type fn = (id: string, action: 'add' | 'remove', user: IUser) => ReturnType<typeof asyncHandler>

const likeService: fn = (id, action, user) => {
	const dbAction = action === 'add' ? '$addToSet' : '$pull'
	return asyncHandler(
		Article.findByIdAndUpdate(
			id,
			{
				[dbAction]: {
					likes: user?.id,
				},
			},
			{ new: true },
		),
	)
}

export default likeService
