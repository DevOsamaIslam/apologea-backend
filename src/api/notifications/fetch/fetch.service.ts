import { asyncHandler } from 'async-handler-ts'
import { NotificationModel } from '../Notifications.Model'
import { Request } from 'express'
import z from 'zod'
import { PaginationSchema } from '@constants'
import { mapToMongooseFilter } from '@helpers'

export const getNotificationsService = async (req: Request) => {
  const { limit, page, sort, filters, populate } = req.body as z.infer<typeof PaginationSchema>
  const mappedFilters = mapToMongooseFilter(filters)

  return await NotificationModel.paginate(mappedFilters, {
    limit,
    page,
    sort,
    populate,
  })
}

export const getNotificationByIdService = async (id: string) => {
  return await asyncHandler(NotificationModel.findById(id).exec())
}

export const getNotificationsByUserService = async (userId: string) => {
  return await asyncHandler(NotificationModel.find({ userId }).sort({ createdAt: -1 }).exec())
}

export const getUnreadNotificationsByUserService = async (userId: string) => {
  return await asyncHandler(
    NotificationModel.find({ userId, read: false }).sort({ createdAt: -1 }).exec(),
  )
}

export const getNotificationsByTypeService = async (userId: string, type: string) => {
  return await asyncHandler(NotificationModel.find({ userId, type }).sort({ createdAt: -1 }).exec())
}
