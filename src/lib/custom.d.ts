import { IUser } from '#/api/users/model/Schema'

declare module 'express-serve-static-core' {
	interface Request {
		user?: IUser
	}
}
