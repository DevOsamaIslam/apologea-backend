import { auth } from '#/config/settings'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import { feedbackType, IFeedback } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncHandler = async (fn: any) => {
	try {
		const result = await fn
		return result
	} catch (error) {
		return { error }
	}
}

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

export const returnHandler = (
	statusCode: StatusCodes,
	data?: unknown,
	feedback?: IFeedback
) => {
	return {
		statusCode,
		data,
		feedback,
	}
}

export const feedback = (type: feedbackType, message = ''): IFeedback => {
	return {
		type,
		message,
	}
}

export const signJWT = (payload: JwtPayload): string => {
	return jwt.sign(payload, auth.secret)
}

export const protectedRoute = passport.authenticate('jwt', { session: false })

// @ts-ignore
export const patchObject = (original, patch) => {
	Object.entries(patch).forEach(([key, value]) => {
		typeof value === 'object' && patch[key]
			? patchObject(original[key], patch[key])
			: (original[key] = patch[key])
	})
}
