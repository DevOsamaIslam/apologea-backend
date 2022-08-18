import { NextFunction, Request } from 'express'

export const sanitizeRequest = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	// sanitize request body
	Object.keys(req.body).forEach((key: string) => {
		req.body[key] = ''
	})
	// sanitize request params
	Object.keys(req.params).forEach((key: string) => {
		req.body[key] = ''
	})
	// sanitize request query
	Object.keys(req.query).forEach((key: string) => {
		req.body[key] = ''
	})

	next()
}
