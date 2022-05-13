/* eslint-disable @typescript-eslint/no-namespace */

export type feedbackType = 'success' | 'error' | 'warning'

export interface IFeedback {
	type: feedbackType
	message: string
}

export interface IReturnHandler {
	statusCode: number
	data?: unknown
	feedback?: IFeedback
}

export type $jwtPayload = {
	id: string
	iat: Date
	exp: Date
}
