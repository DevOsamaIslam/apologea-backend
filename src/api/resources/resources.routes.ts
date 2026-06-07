import { PaginationSchema } from '@constants'
import express from 'express'
import { protectedRoute } from 'middleware/auth.middleware'
import { validateRequest } from 'middleware/request.middleware'
import { createResourceSchema, updateResourceSchema } from './resources.schema'
import {
  getAllController,
  getOneController,
  getResourceByIdController,
} from './fetch/fetch.controller'
import { createController } from './create/create.controller'
import { updateController } from './update/update.controller'
import { deleteController } from './delete/delete.controller'

const resourcesRouter = express.Router()

resourcesRouter.post('/', protectedRoute, validateRequest(PaginationSchema), getAllController)

resourcesRouter.post(
  '/create',
  protectedRoute,
  validateRequest(createResourceSchema),
  createController,
)

resourcesRouter.post('/:slug', validateRequest(PaginationSchema), getOneController)

resourcesRouter.post(
  '/@:id',
  protectedRoute,
  validateRequest(PaginationSchema),
  getResourceByIdController,
)

resourcesRouter.patch(
  '/:id',
  protectedRoute,
  validateRequest(updateResourceSchema),
  updateController,
)

resourcesRouter.delete('/@:id', protectedRoute, deleteController)

export default resourcesRouter
