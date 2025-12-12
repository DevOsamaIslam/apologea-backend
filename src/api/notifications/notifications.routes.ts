import { PaginationSchema, SUCCESS } from '@constants'
import { feedback, returnHandler } from '@helpers'
import SocketServer from 'app/socket'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { protectedRoute } from 'middleware/auth.middleware'
import { validateRequest } from 'middleware/request.middleware'
import { fetchNotificationsController } from './fetch/fetch.controller'
import { NOTIFICATION_TYPES, NotificationSchema, TNotification } from './notifications.schema'
import { markReadNotificationsController } from './update/mark-read-notification.controller'

export const notificationsRouter = Router()

notificationsRouter.post(
  '/',
  protectedRoute,
  validateRequest(PaginationSchema),
  fetchNotificationsController,
)

notificationsRouter.post('/test', protectedRoute, (req, res, next) => {
  SocketServer.sendToUser(req.user._id.toString(), 'articleResponse', {})
  return next(returnHandler(StatusCodes.OK, null, feedback('success', SUCCESS.found)))
})

notificationsRouter.post('/manual', protectedRoute, (req, res, next) => {
  const testNotification: TNotification = {
    data: {},
    id: Date.now() + '',
    type: NOTIFICATION_TYPES.debateResponse,
    userId: req.user._id.toString(),
    readAt: new Date(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const notification = NotificationSchema.safeParse(req.body).success ? req.body : testNotification
  SocketServer.sendToUser(req.user._id.toString(), notification.type, notification)
  return next(returnHandler(StatusCodes.OK, notification, feedback('success', SUCCESS.found)))
})

notificationsRouter.patch('/@:notificationId', protectedRoute, markReadNotificationsController)
