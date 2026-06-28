import { ArticleModel } from '../model/Article.Model'
import { z } from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'
import { TUserDocument } from '@api/users/model/User.Model'

const FUZZY_SEARCH_FIELDS = ['title', 'slug', 'excerpt', 'content', 'tags'] as const
const SEARCH_FILTER_KEYS = ['search', 'q', 'query'] as const

// Escape user-provided search text so special regex characters are matched literally.
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createFuzzyRegex = (value: string) => {
  // Convert each search term into a loose character sequence, e.g. "abc" => "a.*b.*c".
  const fuzzyValue = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(term => term.split('').map(escapeRegex).join('.*'))
    .join('.*')

  return new RegExp(fuzzyValue, 'i')
}

const getSearchValue = (filters: z.infer<typeof PaginationSchema>['filters']) => {
  // Support common client-side names for the same article search filter.
  const searchKey = SEARCH_FILTER_KEYS.find(key => filters?.[key]?.value)

  if (!searchKey) return null

  const value = filters?.[searchKey]?.value

  if (typeof value !== 'string') return null

  return value.trim() || null
}

export const getArticlesService = async (
  params: z.infer<typeof PaginationSchema>,
  user?: TUserDocument,
) => {
  const { limit, page, sort, filters, populate } = params
  const mappedFilters = mapToMongooseFilter(filters)
  const searchValue = getSearchValue(filters)

  // Search keys are handled separately through $or and should not remain as direct DB fields.
  SEARCH_FILTER_KEYS.forEach(key => delete mappedFilters[key])

  if (searchValue) {
    const fuzzyRegex = createFuzzyRegex(searchValue)
    // Match the fuzzy search text against article text fields while preserving other filters.
    mappedFilters.$or = FUZZY_SEARCH_FIELDS.map(field => ({ [field]: fuzzyRegex }))
  }

  // Enforce draft visibility rules unconditionally at the database level.
  // Drafts (publishedAt: null) should only be returned if they belong to the currently logged in user.
  if (user) {
    const originalOrFields = mappedFilters.$or
    delete mappedFilters.$or

    const visibilityCondition = {
      $or: [
        { publishedAt: { $ne: null } },
        { publishedAt: null, authorId: user._id },
      ],
    }

    if (originalOrFields) {
      mappedFilters.$and = [visibilityCondition, { $or: originalOrFields }]
    } else {
      mappedFilters.$and = [visibilityCondition]
    }
  } else {
    mappedFilters.publishedAt = { $ne: null }
  }

  return ArticleModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
    select: user ? '' : '-content -html',
  })
}

export const getArticleBySlugService = async (params: {
  slug: string
  populate: any
  user: TUserDocument
}) => {
  const { slug, populate, user } = params
  const article = await ArticleModel.findOne({ slug })
    .populate(populate)
    .select(user ? '' : '-content -html')
    .exec()

  if (article && user?._id !== article.authorId) {
    article.views++
    await article.save()
  }

  return article
}
