import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'
import { IArticle } from '../types'

type $updateArticleService = (patch: Partial<IArticle>, user: IUser) => ReturnType<typeof asyncHandler<IArticle>>

export const updateArticleService: $updateArticleService = async (patch, user) => {
	const [data, error] = await asyncHandler<IArticle>(Article.findById(patch.id))

	if (data) {
		data.title = patch.title || data.title
		data.body = patch.body || data.body
		data.visible = patch.visible || data.visible
		await data.save()
	}

	return [data, error]
}
