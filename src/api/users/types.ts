import mongoose from 'mongoose'
import { IUserAuth } from '../auth/types'

export interface IUserProfile {
	phone?: string
	xp?: number
	languages?: string[]
	following?: string[]
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
}
