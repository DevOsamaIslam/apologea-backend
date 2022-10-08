import { AUTH, ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { IUserRegistrationFormData } from 'api/auth/types'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { registerService } from './register.service'

export default async (req: Request<any, any, IUserRegistrationFormData>, res: Response, next: NextFunction) => {
	const formData = req.body
	if (
		!formData?.username ||
		!formData.email ||
		!formData?.password ||
		!formData?.confirmPassword ||
		formData.password !== formData?.confirmPassword
	)
		return next(returnHandler(StatusCodes.BAD_REQUEST, { formData }, feedback('error', ERROR.missingFields)))

	if (formData?.role === 'Publisher') {
		console.log({ formData: !formData.name || !formData.affiliations || !formData.bio || !formData.qualifications || !formData.phone })
		if (!formData.name || !formData.affiliations || !formData.bio || !formData.qualifications || !formData.phone)
			return next(returnHandler(StatusCodes.BAD_REQUEST, formData, feedback('error', ERROR.missingFields)))
	}
	formData.role = formData.role || 'Reader'
	const [data, error] = await registerService(formData)
	if (data)
		return next(
			returnHandler(
				StatusCodes.CREATED,
				{
					token: sign({ id: data.id }, AUTH.secret, {
						expiresIn: AUTH.expiry,
					}),
				},
				feedback('success', SUCCESS.registered),
			),
		)
	if (error) return next(returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)))
}
