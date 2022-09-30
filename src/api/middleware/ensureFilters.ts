import { Request, Response, NextFunction } from 'express'

export default function ensureFilters(req: Request<any, any, { filters: {} }>, _: Response, next: NextFunction) {
	if (!req.body.filters) req.body.filters = {}
	next()
}
