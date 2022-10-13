import { IPaging } from '@types'
import { IUserProfile } from 'api/users/model/types'
import { Request } from 'express'
import { IArticle } from '../model/types'

export interface IUpdateArticleRequest extends Request {
	body: Partial<IArticle>
	params: { articleId?: string }
}
