import AuthSchema, { IUserAuth } from '#/api/auth/model/Schema'
import mongoose from 'mongoose'
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
					ref: 'User',
					default: [],
				},
			],
			followers: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'User',
					default: [],
				},
			],
			name: {
				type: String,
				default: function (this: IUser) {
					return this.auth.username
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
	{ timestamps: true }
)

export interface IUserProfile {
	phone?: string
	xp?: number
	languages?: string[]
	following?: string[]
	followers?: string[]
	name?: string
	bio?: string
	pic?: string
	experience?: string
	social?: {
		name: string
		link: string
	}
	affiliations?: string[]
}

export interface IUser extends mongoose.Model<null> {
	id: string
	profile: IUserProfile
	auth: IUserAuth
	error?: ErrorEvent
}

export default UserSchema
