import { runTransaction } from '@helpers'
import { ServerError } from '@types'
import { StatusCodes } from 'http-status-codes'
import { NotificationModel } from '../model/Notifications.Model'

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
