import { responses } from '@helpers'
import { IUser } from 'api/users/model/types'
import { NextFunction, Request, Response } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
	const userResponse = (user: IUser) => ({
		username: user.auth.username,
		email: user.auth.email,
		...user.profile,
	})
	return next(responses.success(userResponse(req.user), 'authenticated'))
}
