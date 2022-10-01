import mongoose, { Document } from 'mongoose'
import { IUser } from '../users/types'

export interface IArticle extends Document {
	title: string
	body: string
	excerpt?: string
	author: mongoose.Types.ObjectId
	responseTo?: string
	responses: mongoose.Types.ObjectId[]
	likes?: string[]
	affirms?: string[]
	comments: IComment[]
	visible?: boolean
	error?: Error
}

export interface IComment {
	_id?: mongoose.Types.ObjectId
	contents: string
	author: IUser['id']
}
