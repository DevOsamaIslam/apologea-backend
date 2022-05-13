import { IUser } from '#/api/users/model/Schema'
import { schemaNames } from '#lib/constants'
import mongoose from 'mongoose'
import { Schema, SchemaTypes, Model } from 'mongoose'
import commentSchema, { IComment } from './CommentSchema'

const { ObjectId } = SchemaTypes

export interface IBlog extends Model<null> {
	title: string
	body: string
	excerpt?: string
	author: mongoose.Types.ObjectId
	responseTo?: IUser
	likes?: string[]
	affirms?: string[]
	comments: IComment[]
	visible?: boolean
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
			ref: schemaNames.user,
			required: true,
		},
		responseTo: {
			type: ObjectId,
			ref: schemaNames.blog,
		},
		likes: [
			{
				type: ObjectId,
				ref: schemaNames.user,
				default: [],
			},
		],
		affirms: [
			{
				type: ObjectId,
				ref: schemaNames.user,
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
