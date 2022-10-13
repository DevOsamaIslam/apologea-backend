import AuthSchema from 'api/auth/model/Schema'
import { SCHEMAS } from '@constants'
import mongoose from 'mongoose'
import { IUser } from './types'

// import UserValidation from './User.validation.js'

export const UserSchema = new mongoose.Schema(
	{
		profile: {
			phone: {
				type: String,
				default: '',
			},
			xp: {
				type: Number,
				default: 0,
			},
			languages: {
				type: Array,
				default: [],
			},
			following: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: SCHEMAS.user,
					default: [],
				},
			],
			followers: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: SCHEMAS.user,
					default: [],
				},
			],
			name: {
				type: String,
				default: function (this: IUser) {
					return this.auth?.username
				},
			},
			bio: {
				type: String,
				default: '',
			},
			pic: {
				type: String,
				default: '',
			},
			exprience: {
				type: String,
				default: '',
			},
			socials: {
				type: Array,
				default: [],
			},
			affiliations: {
				type: Array,
				default: [],
			},
		},
		auth: AuthSchema,
	},
	{ timestamps: true },
)

export default UserSchema
