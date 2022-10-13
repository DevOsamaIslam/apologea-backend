import { Request } from 'express'
import { IArticle } from '../model/types'

export interface ICreateArticleRequest extends Request {
	body: Partial<IArticle>
}
