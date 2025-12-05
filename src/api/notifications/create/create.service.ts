import { asyncHandler } from 'async-handler-ts'
import { NotificationModel, TNotificationSchema } from '../model/Notifications.Model'

export const createNotificationService = async (notification: TNotificationSchema) => {
  return await asyncHandler(NotificationModel.create(notification))
}

export const createMultipleNotificationsService = async (notifications: TNotificationSchema[]) => {
  return await asyncHandler(NotificationModel.insertMany(notifications))
}
