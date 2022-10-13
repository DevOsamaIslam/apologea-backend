import { ERROR, SUCCESS, WARNING } from '@constants'
import { IFeedback, feedbackType } from '@types'
import { StatusCodes } from 'http-status-codes'

export const returnHandler = (statusCode: StatusCodes, data?: unknown, feedback?: IFeedback) => {
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

export const responses = {
	notFound: (data?: any, fb?: IFeedback) => returnHandler(StatusCodes.NOT_FOUND, data, fb || feedback('warning', WARNING.noData)),

	ISE: (error: any, fb?: IFeedback) => returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, fb || feedback('error', ERROR.SWR)),

	invalidParams: (data: any, fb?: IFeedback) =>
		returnHandler(StatusCodes.BAD_REQUEST, data, fb || feedback('error', ERROR.invalidParams)),

	missingFields: (data?: any, fb?: IFeedback) =>
		returnHandler(StatusCodes.BAD_REQUEST, data, fb || feedback('error', ERROR.missingFields)),

	success: (data: any, message: string) => returnHandler(StatusCodes.OK, data, feedback('success', message)),

	created: (data: any, message?: string) => returnHandler(StatusCodes.CREATED, data, feedback('success', message || SUCCESS.created)),
}
