import { asyncHandler } from 'async-handler-ts'
import { NotificationModel, TNotificationSchema } from '../Notifications.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'

interface UpdateNotificationParams {
  notificationId: string
  updateData: Partial<Pick<TNotificationSchema, 'read' | 'data'>>
}

export const updateNotificationService = async (params: UpdateNotificationParams) => {
  return runTransaction(async () => {
    const { notificationId, updateData } = params

    // Check if the notification exists
    const notification = await NotificationModel.findById(notificationId)

    if (!notification) {
      throw new ServerError({
        message: 'Notification not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    // Update only allowed fields
    if (updateData.read !== undefined) {
      notification.read = updateData.read
    }

    if (updateData.data !== undefined) {
      notification.data = { ...notification.data, ...updateData.data }
    }

    await notification.save()
    return notification
  })
}

export const markAsReadService = async (notificationId: string) => {
  return runTransaction(async () => {
    const notification = await NotificationModel.findById(notificationId)

    if (!notification) {
      throw new ServerError({
        message: 'Notification not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    notification.read = true
    await notification.save()
    return notification
  })
}

export const markAllAsReadService = async (userId: string) => {
  return runTransaction(async () => {
    const result = await NotificationModel.updateMany({ userId, read: false }, { read: true })

    return { modifiedCount: result.modifiedCount }
  })
}

export const markMultipleAsReadService = async (notificationIds: string[]) => {
  return runTransaction(async () => {
    const result = await NotificationModel.updateMany(
      { _id: { $in: notificationIds }, read: false },
      { read: true },
    )

    return { modifiedCount: result.modifiedCount }
  })
}
