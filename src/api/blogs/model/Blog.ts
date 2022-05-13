import { schemaNames } from '#lib/constants'
import { model } from 'mongoose'
import BlogSchema, { IBlog } from './BlogSchema'

const _model = model<IBlog>(schemaNames.blog, BlogSchema)

export default _model
_model.createIndexes({
	title: 'text',
	body: 'text',
})
