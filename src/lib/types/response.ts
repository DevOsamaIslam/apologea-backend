export type feedbackType = 'success' | 'error' | 'warning'

export interface IFeedback {
	type: feedbackType
	message: string
}

export interface IReturnHandler<T = unknown> {
	statusCode: number
	data?: T
	feedback?: IFeedback
}
