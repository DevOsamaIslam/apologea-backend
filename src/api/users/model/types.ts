import mongoose, { Document, LeanDocument } from 'mongoose'
import { IUserAuth } from '../../auth/types'

export interface IUserProfile {
	phone?: string
	xp?: number
	languages?: string[]
	following?: string[]
	name?: string
	bio?: string
	pic?: string
	qualifications?: string
	socials?: [
		{
			name: string
			link: string
		},
	]
	affiliations?: string[]
}

export interface IUserDocument extends Document {
	profile: IUserProfile
	auth: IUserAuth
}

export interface IUser extends LeanDocument<IUserDocument> {}
