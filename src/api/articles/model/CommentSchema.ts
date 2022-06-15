import { SCHEMAS } from '#lib/constants'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.SchemaTypes

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
