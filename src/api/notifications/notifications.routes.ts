import { Router } from 'express'
import { protectedRoute } from 'middleware/auth.middleware'
import { fetchNotificationsController } from './fetch/fetch.controller'
import { validateRequest } from 'middleware/request.middleware'
import { PaginationSchema } from '@constants'

export const notificationsRouter = Router()

notificationsRouter.post(
  '/',
  protectedRoute,
  validateRequest(PaginationSchema),
  fetchNotificationsController,
)

notificationsRouter.patch('/@:notificationId', protectedRoute, fetchNotificationsController)
