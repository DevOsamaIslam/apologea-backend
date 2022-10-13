import { Request } from 'express'

export interface IAffirmRequest extends Request {
	body: {
		articleId?: string
		action?: 'add' | 'remove'
	}
}
