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
