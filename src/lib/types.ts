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

export type $role =
	| 'Guest'
	| 'Reader'
	| 'Reader+'
	| 'Moderator'
	| 'Debater'
	| 'Publisher'
	| 'Admin'
