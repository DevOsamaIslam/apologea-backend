import { PaginationSchema } from '@constants'
import express from 'express'
import { protectedRoute } from 'middleware/auth.middleware'
import { validateRequest } from 'middleware/request.middleware'
import { createArticleSchema, updateArticleSchema } from './articles.schema'
import { getAllController, getOneController } from './fetch/fetch.controller'
import { createController } from './create/create.controller'
import { updateController } from './update/update.controller'
import { deleteController } from './delete/delete.controller'

const articlesRouter = express.Router()

articlesRouter.post('/', validateRequest(PaginationSchema), getAllController)

articlesRouter.post(
  '/create',
  protectedRoute,
  validateRequest(createArticleSchema),
  createController,
)

articlesRouter.post('/:slug', validateRequest(PaginationSchema), getOneController)

articlesRouter.patch('/:id', protectedRoute, validateRequest(updateArticleSchema), updateController)

articlesRouter.delete('/:id', protectedRoute, deleteController)

export default articlesRouter
