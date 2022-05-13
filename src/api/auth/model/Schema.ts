import mongoose from 'mongoose'

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
	},
	{ _id: false, timestamps: true, selectPopulatedPaths: false }
)

export interface IUserAuth extends mongoose.Document {
	username: string
	email: string
	password: string
}

export default AuthSchema
