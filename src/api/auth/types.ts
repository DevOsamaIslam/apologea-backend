import { $role } from '#lib/types'
import mongoose from 'mongoose'

export interface IUserAuth extends mongoose.Document {
	username: string
	email: string
	password: string
	role: $role
	reset?: {
		token: string
	}
}
