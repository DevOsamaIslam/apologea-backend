import { ArticleModel } from '../model/Article.Model'
import { z } from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'

export const getArticlesService = async (params: z.infer<typeof PaginationSchema>) => {
  const { limit, page, sort, filters, populate } = params
  const mappedFilters = mapToMongooseFilter(filters)

  return ArticleModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
  })
}

export const getArticleBySlugService = async (params: { slug: string; populate: any }) => {
  const { slug, populate } = params
  const article = await ArticleModel.findOne({ slug }).populate(populate).exec()

  if (article) {
    article.views++
    await article.save()
  }

  return article
}
