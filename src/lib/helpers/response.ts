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
