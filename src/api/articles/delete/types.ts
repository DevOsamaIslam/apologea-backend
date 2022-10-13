import { Request } from 'express'

export interface IDeleteArticleRequest extends Request {
	params: { articleId?: string }
}
