import { IFeedback, ServerError, feedbackType } from '@types'
import { StatusCodes } from 'http-status-codes'

export const returnHandler = (statusCode: StatusCodes, data?: unknown, feedback?: IFeedback) => {
  if (data instanceof ServerError) {
    return {
      statusCode: data.statusCode,
      data: data.message,
      feedback: data.type,
    }
  }
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
