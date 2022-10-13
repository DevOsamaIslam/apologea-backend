import { Request } from 'express'

export interface ICommentRequest extends Request {
	body: {
		action?: 'add' | 'remove'
		comment?: string
		articleId?: string
	}
}
