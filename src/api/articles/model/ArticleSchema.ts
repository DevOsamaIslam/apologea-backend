import { SCHEMAS } from '@constants'
import commentSchema from './CommentSchema'
import { Schema, SchemaTypes } from 'mongoose'
import { IArticle } from '../types'

const schema = new Schema<IArticle>(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		excerpt: {
			type: String,
			default: function (this: IArticle) {
				return this.body.slice(0, 100) + '...'
			},
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: SCHEMAS.user,
			required: true,
		},
		responseTo: {
			type: Schema.Types.ObjectId,
			ref: SCHEMAS.blog,
		},
		responses: [
			{
				type: Schema.Types.ObjectId,
				ref: SCHEMAS.blog,
				default: [],
			},
		],
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: SCHEMAS.user,
				default: [],
			},
		],
		affirms: [
			{
				type: Schema.Types.ObjectId,
				ref: SCHEMAS.user,
				default: [],
			},
		],
		comments: [commentSchema],
		visible: {
			type: Boolean,
			default: false,
		},
		isPremium: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, autoIndex: true },
)
schema.index({
	title: 'text',
	body: 'text',
})

export default schema
