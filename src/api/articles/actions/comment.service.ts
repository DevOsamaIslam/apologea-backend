import { asyncHandler } from '@helpers'
import { IUser } from 'api/users/types'
import Article from '../model/Article'
import { IArticle, IComment } from '../types'

type fn = (articleId: string, action: 'add' | 'remove', user: IUser, comment?: string) => ReturnType<typeof asyncHandler>

const commentService: fn = async (articleId, action, user, comment) => {
	const [data, error] = await asyncHandler<IArticle>(Article.findById(articleId))

	if (data) {
		if (action === 'add' && comment) {
			data.comments.push({
				contents: comment,
				author: user.id,
			})
		} else {
			data.comments = data.comments.filter((oldComment: IComment) => {
				if (oldComment._id?.toString() !== comment && oldComment.author !== user.id) return oldComment
			})
		}
		data.save()
	}

	return [data, error]
}

export default commentService
