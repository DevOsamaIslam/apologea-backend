import { SCHEMAS } from '@constants'
import commentSchema from './CommentSchema'
import { Schema, SchemaTypes } from 'mongoose'
import { IArticle } from '../types'

const { ObjectId } = SchemaTypes

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
			type: ObjectId,
			ref: SCHEMAS.user,
			required: true,
		},
		responseTo: {
			type: ObjectId,
			ref: SCHEMAS.blog,
		},
		responses: [
			{
				type: ObjectId,
				ref: SCHEMAS.blog,
				default: [],
			},
		],
		likes: [
			{
				type: ObjectId,
				ref: SCHEMAS.user,
				default: [],
			},
		],
		affirms: [
			{
				type: ObjectId,
				ref: SCHEMAS.user,
				default: [],
			},
		],
		comments: [commentSchema],
		visible: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, autoIndex: true }
)
schema.index({
	title: 'text',
	body: 'text',
})

export default schema
