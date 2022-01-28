import mongoose from 'mongoose'
import UserValidation from './User.validation.js'

export const schema = new mongoose.Schema({
	username: {
		type: String,
		unique: [true, 'Username is taken'],
		required: [true, 'Username is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	phone: {
		type: String,
		default: ''
	},
	xp: {
		type: Number,
		default: 0
	},
	languages: {
		type: Array,
		default: []
	},
	following: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			default: []
		}
	],
	followers: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			default: []
		}
	],
	personal: {
		name: {
			type: String,
			default: ''
		},
		bio: {
			type: String,
			default: ''
		},
		pic: {
			type: String,
			default: ''
		},
		exprience: {
			type: String,
			default: ''
		},
		socials: {
			type: Array,
			default: []
		},
		affiliations: {
			type: Array,
			default: []
		},
	},
}, { timeseries: true })

schema.pre('save', UserValidation)

export default mongoose.model('User', schema)