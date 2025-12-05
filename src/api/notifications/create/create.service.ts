import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../model/Notifications.Model'
import { TCreateNotification } from '../notifications.schema'

export const createNotificationService = async (notification: TCreateNotification) => {
  return await asyncHandler(NotificationModel.create(notification))
}

export const createMultipleNotificationsService = async (notifications: TCreateNotification[]) => {
  return await asyncHandler(NotificationModel.insertMany(notifications))
}
