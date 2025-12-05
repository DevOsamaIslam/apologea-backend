import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../Notifications.Model'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { runTransaction } from 'lib/helpers/transactions'

export const deleteNotificationService = async (notificationId: string) => {
  return runTransaction(async () => {
    const notification = await NotificationModel.findById(notificationId)

    if (!notification) {
      throw new ServerError({
        message: 'Notification not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    await NotificationModel.findByIdAndDelete(notificationId)
    return { deleted: true, notificationId }
  })
}

export const deleteNotificationsByUserService = async (userId: string) => {
  return runTransaction(async () => {
    const result = await NotificationModel.deleteMany({ userId })
    return { deletedCount: result.deletedCount }
  })
}

export const deleteReadNotificationsService = async (userId: string) => {
  return runTransaction(async () => {
    const result = await NotificationModel.deleteMany({ userId, read: true })
    return { deletedCount: result.deletedCount }
  })
}

export const deleteMultipleNotificationsService = async (notificationIds: string[]) => {
  return runTransaction(async () => {
    const result = await NotificationModel.deleteMany({ _id: { $in: notificationIds } })
    return { deletedCount: result.deletedCount }
  })
}
