import { runTransaction } from 'lib/helpers/transactions'
import { ArticleModel } from '../model/Article.Model'
import { TUpdateArticle } from '../articles.schema'

export const updateArticleService = async (params: { id: string; article: TUpdateArticle }) => {
  const { id, article } = params

  return runTransaction(async () => {
    const existingArticle = await ArticleModel.findById(id)

    if (!existingArticle) {
      throw new Error('Article not found')
    }

    Object.entries(article).forEach(([key, value]) => {
      // @ts-expect-error
      existingArticle[key] = value
    })

    await existingArticle.save()
    return existingArticle
  })
}
