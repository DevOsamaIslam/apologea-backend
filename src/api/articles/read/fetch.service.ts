import { asyncHandler } from '@helpers'
import { IPaging } from '@types'
import { $filter } from 'lib/types/generic'
import Article from '../model/Article'
import { IArticle } from '../types'

type $fetchArticlesService = (filters: $filter, paging: IPaging) => ReturnType<typeof asyncHandler<IArticle[]>>

export const fetchArticlesService: $fetchArticlesService = async (filters, paging) => {
	Object.keys(filters).forEach((element: string) => {
		filters[`profile.${element}`] = filters[element]
	})
	return asyncHandler(
		Article.find({ ...filters })
			.select('-body -comments')
			.paging({ limit: paging.limit, page: paging.page })
			.populate('author', 'profile.name'),
	)
}

type $getOneArticleService = (id: string) => ReturnType<typeof asyncHandler<IArticle | null>>

export const getOneArticleService: $getOneArticleService = async id => {
	return asyncHandler<IArticle | null>(
		Article.findById(id).populate('author', 'profile.name').populate('comments.author', 'profile.name'),
	)
}
