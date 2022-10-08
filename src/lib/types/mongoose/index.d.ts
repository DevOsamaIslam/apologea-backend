import { IUser } from 'api/users/types'
import { IPaging } from '../request'

export type $cacheOptions = { expiry?: number }

declare module 'mongoose' {
	export interface Query {
		cache: (options?: $cacheOptions) => Query
		useCache: boolean
		expiry: number

		paging: (options?: IPaging) => Query
		pageOptions: IPaging
	}
}
