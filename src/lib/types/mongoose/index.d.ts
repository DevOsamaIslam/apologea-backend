import { IUser } from 'api/users/types'

export type $cacheOptions = { expiry?: number }

declare module 'mongoose' {
	export interface Query {
		cache: (options?: $cacheOptions) => Query
		useCache: boolean
		expiry: number
	}
}
