import mongoose from 'mongoose'
import { ROLES } from '#lib/constants'
import { $role } from '#lib/types'

const AuthSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: [true, 'Username is taken'],
			required: [true, 'Username is required'],
		},
		email: {
			type: String,
			unique: [true, 'Email is used'],
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			default: ROLES.READER.label,
		},
		reset: {
			token: String,
		},
	},
	{ _id: false, timestamps: true }
)

export interface IUserAuth extends mongoose.Document {
	username: string
	email: string
	password: string
	role: $role
	reset?: {
		token: string
	}
}

export default AuthSchema
