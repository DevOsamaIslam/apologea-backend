import { IUser } from '#/api/users/model/Schema'
import { schemaNames } from '#lib/constants'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.SchemaTypes

export interface IComment {
	contents: string
	author: IUser
}

const commentSchema = new mongoose.Schema({
	contents: {
		type: String,
		required: true,
	},
	author: {
		type: ObjectId,
		ref: schemaNames.user,
		required: true,
	},
})

export default commentSchema
