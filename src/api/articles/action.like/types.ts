import { Request } from 'express'

export interface ILikeRequest extends Request {
	body: {
		articleId?: string
		action?: 'add' | 'remove'
	}
}
