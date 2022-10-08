import { asyncHandler } from '@helpers'
import { IPaging } from '@types'
import Article from '../model/Article'

type $searchService = (term: string, paging?: IPaging) => ReturnType<typeof asyncHandler>

export const searchService: $searchService = (term, paging) => {
	return asyncHandler(
		Article.find({
			$text: { $search: term },
		})
			.select('-body -comments')
			.populate('author', 'profile.name')
			.paging(paging),
	)
}
