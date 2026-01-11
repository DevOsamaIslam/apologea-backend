import { PaginationSchema } from '@constants'
import { Router } from 'express'
import { validateRequest } from 'middleware/request.middleware'
import { createDebateSchema, updateDebateSchema } from './debates.schema'
import { protectedRoute } from 'middleware/auth.middleware'
import { getAllController, getOneController } from './fetch/fetch.controller'
import { createDebateController } from './create/create.controller'
import { updateController } from './update/update.controller'
import { deleteController } from './delete/delete.controller'

const debatesRouter = Router()

debatesRouter.post('/', validateRequest(PaginationSchema), getAllController)

debatesRouter.post(
  '/create',
  protectedRoute,
  validateRequest(createDebateSchema),
  createDebateController,
)

debatesRouter.post('/:slug', validateRequest(PaginationSchema), getOneController)

debatesRouter.patch('/:id', protectedRoute, validateRequest(updateDebateSchema), updateController)

debatesRouter.delete('/:id', protectedRoute, deleteController)

export default debatesRouter
