import { IFeedback } from './response'

interface IError {
  type: IFeedback['type']
  message: string
}

interface IServerError extends IError {
  statusCode?: number
}

export class ServerError extends Error {
  public readonly type: string
  public readonly message: string
  public readonly statusCode: number

  constructor(error: IServerError) {
    super(error.message)
    this.type = error.type
    this.message = error.message
    this.statusCode = error.statusCode || 500

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor)
  }
}
