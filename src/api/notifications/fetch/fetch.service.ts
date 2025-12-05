import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'
import z from 'zod'
import { NotificationModel } from '../model/Notifications.Model'
import { TNotificationType } from '../notifications.schema'

export const getNotificationsService = async (params: z.infer<typeof PaginationSchema>) => {
  const { limit, page, sort, filters, populate } = params
  const mappedFilters = mapToMongooseFilter(filters)

  return await NotificationModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
  })
}

export const getNotificationByIdService = async (id: string) => {
  return NotificationModel.findById(id).exec()
}

export const getNotificationsByUserService = async (userId: string) => {
  return NotificationModel.find({ userId }).sort({ createdAt: -1 }).exec()
}

export const getUnreadNotificationsByUserService = async (userId: string) => {
  return NotificationModel.find({ userId, read: false }).sort({ createdAt: -1 }).exec()
}

export const getNotificationsByTypeService = async (userId: string, type: TNotificationType) => {
  return NotificationModel.find({ userId, type }).sort({ createdAt: -1 }).exec()
}
