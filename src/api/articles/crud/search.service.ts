import { asyncHandler } from '@helpers'
import Article from '../model/Article'

type $searchService = (term: string) => ReturnType<typeof asyncHandler>

export const searchService: $searchService = term => {
	return asyncHandler(
		Article.find({
			$text: { $search: term },
		})
			.select('-body -comments')
			.populate('author', 'profile.name'),
	)
}
