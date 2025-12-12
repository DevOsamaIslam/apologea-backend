import { ERROR, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import { asyncHandler } from 'async-handler-ts'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { markReadNotificationService } from './mark-read-notification.service'

export const markReadNotificationsController: RequestHandler = async (req, _, next) => {
  const [notifications, error] = await asyncHandler(
    markReadNotificationService(req.params.notificationId as string),
  )

  if (error)
    return next(
      returnHandler(StatusCodes.INTERNAL_SERVER_ERROR, error, feedback('error', ERROR.SWR)),
    )

  return next(returnHandler(StatusCodes.OK, notifications, feedback('success', SUCCESS.found)))
}
