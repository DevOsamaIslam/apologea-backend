import { NextFunction, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { createUser } from '#/api/auth/model/Auth'
import { returnHandler } from '#helpers'
import { auth } from '#/config/settings'

export default async (req: Request, res: Response, next: NextFunction) => {
	console.log({ request: req.body })

	createUser({
		username: req.body.username as string,
		email: req.body.email as string,
		password: req.body.password as string,
	})
		.then((data) => {
			return next(
				returnHandler(200, {
					token: sign({ id: data.id }, auth.secret, { expiresIn: auth.expiry }),
				})
			)
		})
		.catch((error) => {
			return next(returnHandler(500, error))
		})
}
