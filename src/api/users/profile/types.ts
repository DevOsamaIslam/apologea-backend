import { IPaging } from '@types'
import { Request } from 'express'
import { $filter } from 'lib/types/generic'

export interface IGetPublishersRequest extends Request {
	filters?: $filter
	paging?: IPaging
}

export interface IGetPublisherByIdRequest extends Request {
	userId?: string
}
