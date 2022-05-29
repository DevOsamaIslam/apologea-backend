import { SCHEMAS } from '#lib/constants'
import BlogSchema, { IBlog } from './BlogSchema'
import { model } from 'mongoose'

const _model = model<IBlog>(SCHEMAS.blog, BlogSchema)

export default _model
_model.createIndexes({
	title: 'text',
	body: 'text',
})
