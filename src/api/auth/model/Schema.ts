import mongoose from 'mongoose'
import { ROLES } from '@constants'
import { IUserAuth } from '../types'
import { $roleLabel } from '@types'

const AuthSchema = new mongoose.Schema<IUserAuth>(
	{
		username: {
			type: String,
			unique: true,
			default: function (this: IUserAuth) {
				return this.email.split('@')[0]
			},
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Email is required'],
			validate: function (this: IUserAuth) {
				// console.log({ validate: this })
			},
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			default: ROLES.READER.label as $roleLabel,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		reset: {
			token: String,
		},
	},
	{ _id: false, timestamps: true },
)

export default AuthSchema
