import { IPaging } from '@types'
import { IUserProfile } from 'api/users/model/types'
import { Request } from 'express'
import { IArticle } from '../model/types'

export interface IFetchAllRequest extends Request {
	body: {
		filters: Partial<IUserProfile>
		paging?: IPaging
		sort?: {
			[field: string]: number
		}
	}
}
export interface IFetchOneRequest extends Request {
	params: {
		articleId?: string
	}
}
