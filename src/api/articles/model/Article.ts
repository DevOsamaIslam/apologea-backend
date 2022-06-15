import { SCHEMAS } from '#lib/constants'
import ArticleSchema from './ArticleSchema'
import { model, HydratedDocument } from 'mongoose'
import { IArticle } from '../types'

ArticleSchema.post('save', function (this: HydratedDocument<IArticle>) {
	console.log(this.id)

	if (this.responseTo) {
		_model.findById(this.responseTo).then((data) => {
			if (data) {
				data.responses = [...(data.responses || []), this.id]
			}
			data?.save()
		})
	}
})

const _model = model<IArticle>(SCHEMAS.blog, ArticleSchema)

export default _model
_model.createIndexes({
	title: 'text',
	body: 'text',
})
