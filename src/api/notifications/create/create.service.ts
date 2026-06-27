import SocketServer from 'app/socket'
import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../model/Notifications.Model'
import { TCreateNotification } from '../notifications.schema'

export const createNotificationService = async (notification: TCreateNotification) => {
  return asyncHandler(NotificationModel.create(notification))
}

export const createMultipleNotificationsService = async (notifications: TCreateNotification[]) => {
  notifications.forEach(notification => {
    SocketServer.sendToUser(notification.userId, notification.type, notification)
  })
  return NotificationModel.insertMany(notifications)
}
