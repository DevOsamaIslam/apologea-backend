import { asyncHandler } from '@helpers'
import { IPaging } from '@types'
import { $filter } from 'lib/types/generic'
import Article from '../model/Article'
import { IArticle, IArticleDocument } from '../model/types'

type $fetchArticlesService = (filters: $filter, paging?: IPaging, sort?: Object) => ReturnType<typeof asyncHandler<IArticle[]>>

export const fetchArticlesService: $fetchArticlesService = async (filters, paging, sort) => {
	Object.keys(filters).forEach((element: string) => {
		filters[`profile.${element}`] = filters[element]
	})
	return asyncHandler<IArticleDocument[]>(
		Article.find({ ...filters })
			.select('-body -comments')
			.paging({ limit: paging?.limit, page: paging?.page })
			.populate('author', 'profile.name')
			.sort(sort),
	)
}

type $fetchOneArticleByIdService = (id: string) => ReturnType<typeof asyncHandler<IArticle | null>>

export const fetchOneArticleByIdService: $fetchOneArticleByIdService = async id => {
	const [result, error] = await asyncHandler<IArticleDocument | null>(
		Article.findById(id).populate('author', 'profile.name').populate('comments.author', 'profile.name'),
	)

	if (result) {
		result.viewCount++
		result.save()
	}
	return [result, error]
}

type $fetchTopArticlesService = () => ReturnType<typeof asyncHandler<IArticle[]>>

export const fetchTopArticlesService: $fetchTopArticlesService = async () => {
	return asyncHandler<IArticleDocument[]>(
		Article.find().select('-body -comments').populate('author', 'profile.name').sort({ viewCount: -1 }).limit(5),
	)
}
