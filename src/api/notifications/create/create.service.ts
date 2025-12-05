import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../Notifications.Model'
import { TNotificationSchema } from '../Notifications.Model'

interface CreateNotificationParams {
  userId: string
  type: string
  data: Record<string, unknown>
  read?: boolean
}

export const createNotificationService = async (params: CreateNotificationParams) => {
  return await asyncHandler(
    NotificationModel.create({
      userId: params.userId,
      type: params.type,
      data: params.data,
      read: params.read || false,
    }),
  )
}

export const createMultipleNotificationsService = async (
  notifications: CreateNotificationParams[],
) => {
  return await asyncHandler(
    NotificationModel.insertMany(
      notifications.map(notification => ({
        userId: notification.userId,
        type: notification.type,
        data: notification.data,
        read: notification.read || false,
      })),
    ),
  )
}
