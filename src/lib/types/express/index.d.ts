import { IUser, IUserDocument } from 'api/users/model/types'

declare module 'express-serve-static-core' {
	export interface Request {
		// NOTE if the user object is used, it must have passed through the firewall so we don't need to make it optional
		user: IUser
	}
}
