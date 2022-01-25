import mongoose from 'mongoose'
import UserValidation from './User.validation.js'

export const schema = new mongoose.Schema({
	name: {
		type: String,
		unique: [true, 'Username is taken'],
		required: [true, 'Username is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	birthDate: {
		type: Date,
		index: true
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
	password: String,
	salt: String
}, { timeseries: true })

schema.pre('save', UserValidation)

export default mongoose.model('User', schema)