import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'

type fn = (articleId: string, action: 'add' | 'remove', user: IUser) => ReturnType<typeof asyncHandler>

const affirmService: fn = async (articleId, action, user) => {
	const dbAction = action === 'add' ? '$addToSet' : '$pull'
	const [data, error] = await asyncHandler(
		Article.findByIdAndUpdate(
			articleId,
			{
				[dbAction]: {
					affirms: user?.id,
				},
			},
			{ new: true },
		),
	)

	return [data, error]
}

export default affirmService
