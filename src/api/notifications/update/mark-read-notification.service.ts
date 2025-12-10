import { PaginationSchema } from '@constants'
import { mapToMongooseFilter, runTransaction } from '@helpers'
import z from 'zod'
import { NotificationModel } from '../model/Notifications.Model'
import { TNotificationType } from '../notifications.schema'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'

export const markReadNotificationService = async (notificationId: string) => {
  runTransaction(async () => {
    const notification = await NotificationModel.findById(notificationId)

    if (!notification) {
      throw new ServerError({
        message: 'Notification not found',
        statusCode: StatusCodes.NOT_FOUND,
        type: 'error',
      })
    }

    notification.readAt = new Date()
    await notification.save()
    return notification
  })
}
