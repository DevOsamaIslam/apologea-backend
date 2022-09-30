import { IUser } from 'api/users/types'

declare module 'express-serve-static-core' {
	export interface Request {
		user?: IUser
	}
}
