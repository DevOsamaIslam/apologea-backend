import { SCHEMAS } from '@constants'
import ArticleSchema from './ArticleSchema'
import { model, HydratedDocument } from 'mongoose'
import { IArticle } from './types'

ArticleSchema.post('save', function (this: HydratedDocument<IArticle>) {
	if (this.responseTo) {
		Article.findById(this.responseTo).then(data => {
			if (data) {
				data.responses = [...(data.responses || []), this.id]
			}
			data?.save()
		})
	}
})

const Article = model<IArticle>(SCHEMAS.blog, ArticleSchema)

export default Article
