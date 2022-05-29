import { IUser } from '#/api/users/model/Schema'
import { SCHEMAS } from '#lib/constants'
import commentSchema, { IComment } from './CommentSchema'
import mongoose, { Model, Schema, SchemaTypes } from 'mongoose'

const { ObjectId } = SchemaTypes

export interface IBlog extends Model<Document> {
	title: string
	body: string
	excerpt?: string
	author: mongoose.Types.ObjectId
	responseTo?: IUser
	likes?: string[]
	affirms?: string[]
	comments: IComment[]
	visible?: boolean
	error?: Error
}

const schema = new Schema<IBlog>(
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
			default: function (this: IBlog) {
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
