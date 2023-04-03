import { IDocumentTimestamp } from 'lib/types/generic'
import mongoose, { HydratedDocument } from 'mongoose'

export interface IArticleDocument extends HydratedDocument<IArticle> {}

export interface IArticle extends IDocumentTimestamp {
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
	viewCount: number
}

export interface IComment {
	_id?: mongoose.Types.ObjectId
	contents: string
	author: string
}
