import { IUser } from '#/api/users/model/Schema'
import { SCHEMAS } from '#lib/constants'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.SchemaTypes

export interface IComment {
	_id?: mongoose.Types.ObjectId
	contents: string
	author: IUser['id']
}

const commentSchema = new mongoose.Schema({
	contents: {
		type: String,
		required: true,
	},
	author: {
		type: ObjectId,
		ref: SCHEMAS.user,
		required: true,
	},
})

export default commentSchema
