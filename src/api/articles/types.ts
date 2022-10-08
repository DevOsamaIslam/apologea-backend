import mongoose, { Document, HydratedDocument, LeanDocument } from 'mongoose'

export interface IArticleDocument extends HydratedDocument<IArticle> {}

export interface IArticle {
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
	isPremium?: boolean
}

export interface IComment {
	_id?: mongoose.Types.ObjectId
	contents: string
	author: string
}
