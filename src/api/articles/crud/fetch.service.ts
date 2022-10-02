import { asyncHandler } from '@helpers'
import { $filter } from 'lib/types/generic'
import Article from '../model/Article'
import { IArticle } from '../types'

type $fetchArticlesService = (filters: $filter) => ReturnType<typeof asyncHandler<IArticle[]>>

export const fetchArticlesService: $fetchArticlesService = filters => {
	Object.keys(filters).forEach((element: string) => {
		filters[`profile.${element}`] = filters[element]
	})
	return asyncHandler(
		Article.find({ ...filters })
			.select('-body -comments')
			// .populate('author', 'profile.name')
			.cache()
			.limit(1),
	)
}

type $getOneByIdService = (id: string) => ReturnType<typeof asyncHandler>

export const getOneByIdService: $getOneByIdService = id => {
	return asyncHandler(Article.findById(id).populate('author', 'profile.name').populate('comments.author', 'profile.name'))
}
