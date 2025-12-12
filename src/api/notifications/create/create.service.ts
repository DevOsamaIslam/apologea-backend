import SocketServer from 'app/socket'
import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../model/Notifications.Model'
import { TCreateNotification } from '../notifications.schema'

export const createNotificationService = async (notification: TCreateNotification) => {
  return await asyncHandler(NotificationModel.create(notification))
}

export const createMultipleNotificationsService = async (notifications: TCreateNotification[]) => {
  NotificationModel.insertMany(notifications)

  notifications.forEach(notification => {
    SocketServer.sendToUser(notification.userId, notification.type, notification)
  })
}
