import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { feedback, returnHandler } from '../lib/helpers'

import { ZodSchema } from 'zod'

export const validateRequest = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.method === 'GET' ? req.query : req.body
		req.body = schema.parse(body)
		next()
	} catch (error) {
		return next(returnHandler(StatusCodes.BAD_REQUEST, error, feedback('error', 'Validation Failed')))
	}
}
