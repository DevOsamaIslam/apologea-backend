import { ERROR } from '@constants'
import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'
import { IArticle, IArticleDocument } from '../types'

type $updateArticleService = (
	articleId: string,
	patch: Partial<IArticle>,
	user: IUser,
) => ReturnType<typeof asyncHandler<IArticle | null>>

export const updateArticleService: $updateArticleService = async (articleId, patch, user) => {
	const [data, error] = await asyncHandler<IArticleDocument | null>(Article.findById(articleId))

	if (data) {
		if (user.id === data.author.toString()) {
			data.title = patch.title || data.title
			data.body = patch.body || data.body
			data.visible = patch.visible || data.visible
			await data.save()
		} else return [null, new Error(ERROR.unauthorized)]
	}

	return [data, error]
}
